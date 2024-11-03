const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Models = require("./models.js");
const lodash = require("lodash");
const passport = require("passport");

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

const uuid = require("uuid"); // Universally Unique Identifier

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

// Authentication setup
let auth = require("./auth")(app); // This ensures that Express is available in your "auth.js" file as well.
require("./passport");

app.get('/' , (req , res) => {
  res.send('Welcome to the test.');
});

// Return a list of ALL movies to the user

app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies); // Changed to 200 for successful GET
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get data about a single movie by title

app.get('/movies/:name', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const movie = await Movies.findOne({ name: req.params.name }); // Use findOne with filter for specific movie
    if (movie) {
      res.status(200).json(movie); // Return the full user object, or just specific fields if needed
    } else {
      res.status(404).send('Movie not found'); // Handle case where user is not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Return data about a genre (description) by name/title 

app.get('/genres/:name', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const genre = await Genres.findOne({ name: req.params.name }); // Use findOne with filter for specific user
    if (genre) {
      res.status(200).json(genre); // Return the full user object, or just specific fields if needed
    } else {
      res.status(404).send('Genre not found'); // Handle case where user is not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Return data about a director (bio, birth year, death year) by name

app.get('/directors/:name', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const director = await Directors.findOne({ name: req.params.name }); // Use findOne with filter for specific user
    if (director) {
      res.status(200).json(director); // Return the full user object, or just specific fields if needed
    } else {
      res.status(404).send('Director not found'); // Handle case where user is not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get all users

app.get('/users', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users); // Changed to 200 for successful GET
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get a user by username

app.get('/users/:userName', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const user = await Users.findOne({ userName: req.params.userName }); // Use findOne with filter for specific user
    if (user) {
      res.status(200).json(user); // Return the full user object, or just specific fields if needed
    } else {
      res.status(404).send('User not found'); // Handle case where user is not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Allow new users to register

app.post('/users/create', async (req, res) => {

  //const userName = req.body.userName;
  //const password = req.body.password;
  //const email = req.body.email;
  //const first_Name = req.body.first_Name;
  //const last_Name = req.body.last_Name;
  //const birthDay = req.body.birthDay;
  //const FavoriteMovies = req.body.FavoriteMovies;

  const { userName, password, email, first_Name, last_Name, birthDay, FavoriteMovies } = req.body;

  if (!userName) return res.status(400).send('Username is required.');
  if (!password) return res.status(400).send('Password is required.');
  if (!email) return res.status(400).send('Email is required.');
  try {
    const existingUser = await Users.findOne({ userName: req.body.userName });
    if (existingUser) {
      return res.status(400).send(req.body.userName + ' already exists');
    }
    // Create new user if not found
    const newUser = await Users.create({
      userName: req.body.userName,
      password: req.body.password,
      first_Name: req.body.first_Name,
      last_Name: req.body.last_Name,
      email: req.body.email,
      birthDay: req.body.birthDay,
      FavoriteMovies: req.body.FavoriteMovies
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// Allow users to update their user info

/* We’ll expect JSON in this format
{
  password: String,
  (required)
}*/

app.put('/users/:user/:password/update/:InfoToUpdate/:NewInfo', passport
  .authenticate('jwt', { session:false }), async (req, res) => {
  try {
    const user = await Users.findOne({ userName: req.params.user });
    if (!user) {
      return res.status(400).send(`User: ${req.params.user} not found.`);
    }
    
    // Check if the provided password matches the user's password
    if (req.params.password !== user.password) {
      return res.status(400).send('Password is not correct.');
    }
    
    const infoToUpdate = req.params.InfoToUpdate;
    const newInfo = req.params.NewInfo;

    // Allowed properties to update
    const allowedUpdates = {
      userName: 'userName',
      password: 'password',
      first_Name: 'first_Name',
      last_Name: 'last_Name',
      email: 'email',
    };

    if (allowedUpdates[infoToUpdate]) {
      const updateObject = { [allowedUpdates[infoToUpdate]]: newInfo };

      const updatedUser = await Users.findOneAndUpdate(
        { userName: req.params.user },
        { $set: updateObject },
        { new: true } // Return the updated document
      );

      res.status(200).send('Information updated');
    } else {
      res.status(400).send('Parameter to update not found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});





// Allow users to add a movie to their list of favorites by name

/* We’ll expect JSON in this format
{
  name:  String,
  (required)
}*/

app.post('/users/:userName/movies/:movieName', passport.authenticate('jwt', { session:
  false }), async (req, res) => {
  try {
    // Find the user by username
    const user = await Users.findOne({ userName: req.params.userName });
    if (!user) {
      return res.status(400).send('User: ' + req.params.userName + ' not found.');
    }

    // Find the movie by name in the Movies collection
    const movie = await Movies.findOne({ name: req.params.movieName });
    if (!movie) {
      return res.status(400).send('Movie does not exist in the database.');
    }

    // Add the movie ObjectId to the user's FavoriteMovies array
    const updatedUser = await Users.findOneAndUpdate(
      { userName: req.params.userName },
      { $addToSet: { FavoriteMovies: movie._id } }, // Using $addToSet to prevent duplicates
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: `Movie '${movie.name}' added to ${user.userName}'s favorites.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// Allow users to remove a movie from their list of favorites

app.delete('/users/:userName/movies/:movieName', passport
  .authenticate('jwt', { session:false }), (req, res) => {
  const movieName = req.params.movieName; // Access the movie name from the URL
  res.send(`The movie: ${movieName} was deleted`);
});

// Allow existing users to deregister by userName
// (showing only a text that a user email has been removed—more on this later).

app.delete('/users/:name', passport.authenticate('jwt', { session:false }), async (req, res) => {
  try {
    // Find the user by username
    const userToDelete = await Users.findOne({ userName: req.params.name });

    // Check if the user exists
    if (!userToDelete) {
      return res.status(400).send('User: ' + req.params.name + ' not found.');
    }

    // Remove the user
    await Users.findOneAndDelete({ userName: req.params.name });

    res.status(200).send(`The user: ${req.params.name} was deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});


// Get Documentation

app.use('/',express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});