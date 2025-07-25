/**
 * @typedef Movie
 * @property {string} name
 * @property {string} description
 * @property {string} genre
 * @property {string} director
 * @property {Date} year_released
 */

/**
 * @typedef User
 * @property {string} userName
 * @property {string} email
 * @property {string} first_Name
 * @property {string} last_Name
 * @property {Date} birthDay
 * @property {Array<string>} FavoriteMovies
 */



const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Models = require("./models.js");
const lodash = require("lodash");
const passport = require("passport");
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

const uuid = require("uuid"); // Universally Unique Identifier

mongoose.connect(process.env.CONNECTION_URI, {
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

const cors = require('cors');
app.use(cors());

// Authentication setup
let auth = require("./auth")(app); // This ensures that Express is available in your "auth.js" file as well.
require("./passport");

app.get('/', (req, res) => {
  res.send('Welcome to the test.');
});

/** 
 * @function getMovies
 * @name getMovies
 * @route GET /movies
 * @summary Return a list of ALL movies to the user
 * @security JWT
 * @returns {Array<Movie>} 200 - An array of movie objects
 * @returns {Error} 500 - Unexpected error
 */

async function getAllMovies(req, res) {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies); // Changed to 200 for successful GET
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/movies', passport.authenticate('jwt', { session: false }), getAllMovies);


/** 
 * @function getMovieByName
 * @name getMovieByName
 * @route GET /movies/:name
 * @summary  Get data about a single movie by title
 * @security JWT
 * @param {string} name.path - The title of the movie
 * @returns {Movie} 200 - An object of movie information
 * @returns {Error} 404 - Movie not found
 * @returns {Error} 500 - Unexpected error
 */

async function getMovieByName(req, res) {
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
}

app.get('/movies/:name', passport.authenticate('jwt', { session: false }), getMovieByName);

/**
 * @function getAllGenres
 * @route GET /genres
 * @summary Return a list of ALL genres to the user
 * @security JWT
 * @returns {Array<Object>} 200 - An array of genre objects
 * @returns {Error} 500 - Unexpected error
 */
async function getAllGenres(req, res) {
  try {
    const genres = await Genres.find();
    res.status(200).json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/genres', passport.authenticate('jwt', { session: false }), getAllGenres);

/**
 * @function getGenreByName
 * @route GET /genres/:name
 * @summary Return data about a genre (description) by name/title 
 * @security JWT
 * @param {string} name.path.required - The name of the genre
 * @returns {Object} 200 - An object of genre information
 * @returns {Error} 404 - Genre not found
 * @returns {Error} 500 - Unexpected error
 */
async function getGenreByName(req, res) {
  try {
    const genre = await Genres.findOne({ name: req.params.name });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), getGenreByName);

/**
 * @function getAllDirectors
 * @route GET /directors
 * @summary Return a list of ALL directors to the user
 * @security JWT
 * @returns {Array<Object>} 200 - An array of director objects
 * @returns {Error} 500 - Unexpected error
 */
async function getAllDirectors(req, res) {
  try {
    const directors = await Directors.find();
    res.status(200).json(directors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/directors', passport.authenticate('jwt', { session: false }), getAllDirectors);

/**
 * @function getDirectorByName
 * @route GET /directors/:name
 * @summary Return data about a director (bio, birth year, death year) by name
 * @security JWT
 * @param {string} name.path.required - The name of the director
 * @returns {Object} 200 - An object of director information
 * @returns {Error} 404 - Director not found
 * @returns {Error} 500 - Unexpected error
 */
async function getDirectorByName(req, res) {
  try {
    const director = await Directors.findOne({ name: req.params.name });
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).send('Director not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), getDirectorByName);


/**
 * @function getAllUsers
 * @route GET /users
 * @summary Get all users
 * @security JWT
 * @returns {Array<User>} 200 - An array of user objects
 * @returns {Error} 500 - Unexpected error
 */
async function getAllUsers(req, res) {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/users', passport.authenticate('jwt', { session: false }), getAllUsers);

/**
 * @function getUserByUsername
 * @route GET /users/:userName
 * @summary Get a user by username
 * @security JWT
 * @param {string} userName.path.required - The userName of the user
 * @returns {User} 200 - A user object
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Unexpected error
 */
async function getUserByUsername(req, res) {
  try {
    const user = await Users.findOne({ userName: req.params.userName });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
}

app.get('/users/:userName', passport.authenticate('jwt', { session: false }), getUserByUsername);


/**
 * @function createUser
 * @route POST /users/create
 * @summary Allow new users to register
 * @returns {User} 201 - Newly created user
 * @returns {Error} 400 - Missing or invalid input
 * @returns {Error} 500 - Unexpected error
 */
async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { userName, password, first_Name, last_Name, email, birthDay, FavoriteMovies } = req.body;

  if (!userName) return res.status(400).send('Username is required.');
  if (!password) return res.status(400).send('Password is required.');
  if (!email) return res.status(400).send('Email is required.');

  const hashedPassword = Users.hashPassword(password);

  try {
    const existingUser = await Users.findOne({ userName });
    if (existingUser) {
      return res.status(400).send(`${userName} already exists`);
    }

    const newUser = await Users.create({
      userName,
      password: hashedPassword,
      first_Name,
      last_Name,
      email,
      birthDay,
      FavoriteMovies
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
}

app.post('/users/create',
  [
    check('userName').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
      .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/\d/).withMessage('Must include a number')
      .matches(/[A-Z]/).withMessage('Must include an uppercase letter')
      .matches(/[a-z]/).withMessage('Must include a lowercase letter'),
    check('email').isEmail().withMessage('Invalid email')
  ],
  createUser
);


/**
 * @function updateUser
 * @route PUT /users/update/:userName
 * @summary Allow users to update their information
 * @security JWT
 * @param {string} userName.path.required - The userName of the user
 * @returns {string} 200 - Confirmation message
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Unexpected error
 */
async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { userName, password, first_Name, last_Name, email, birthDay } = req.body;

  try {
    const user = await Users.findOne({ userName: req.params.userName });
    if (!user) return res.status(404).send('User not found');

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (first_Name) user.first_Name = first_Name;
    if (last_Name) user.last_Name = last_Name;
    if (password) user.password = Users.hashPassword(password);

    if (birthDay) {
      const birthDate = new Date(birthDay);
      if (isNaN(birthDate.getTime())) return res.status(400).send('Invalid date format');
      user.birthDay = birthDate;
    }

    await user.save();
    res.status(200).send('User information updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}

app.put('/users/update/:userName',
  [
    check('userName').optional().isLength({ min: 5 }).isAlphanumeric(),
    check('password').optional().isLength({ min: 8 }).matches(/\d/).matches(/[A-Z]/).matches(/[a-z]/),
    check('email').optional().isEmail()
  ],
  updateUser
);


/**
 * @function addFavoriteMovie
 * @route POST /users/:userName/movies/:movieName
 * @summary Add a movie to a user's favorites
 * @security JWT
 * @param {string} userName.path.required - Username
 * @param {string} movieName.path.required - Movie title
 * @returns {Object} 200 - Confirmation and updated user
 * @returns {Error} 400/500 - Movie or user not found / unexpected error
 */
async function addFavoriteMovie(req, res) {
  try {
    const user = await Users.findOne({ userName: req.params.userName });
    if (!user) return res.status(400).send(`User "${req.params.userName}" not found`);

    const movie = await Movies.findOne({ name: req.params.movieName });
    if (!movie) return res.status(400).send('Movie not found');

    const updatedUser = await Users.findOneAndUpdate(
      { userName: req.params.userName },
      { $addToSet: { FavoriteMovies: movie._id } },
      { new: true }
    );

    res.status(200).json({
      message: `Movie '${movie.name}' added to ${user.userName}'s favorites.`,
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
}

app.post('/users/:userName/movies/:movieName', passport.authenticate('jwt', { session: false }), addFavoriteMovie);


/** 
 * @function deleteUserByUsername
 * @route DELETE /users/:name
 * @summary Deregister a user by userName
 * @security JWT
 * @param {string} name.path.required - The userName of the user
 * @returns {Object} 200 - Confirmation message
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Unexpected error
 */

 async function deleteUserByUsername(req, res) { // Add `async` to the function
    const { userName, movieName } = req.params; // Correct typo from `paramse` to `params`

    try {
      const movie = await Movies.findOne({ name: movieName });
      if (!movie) {
        return res.status(400).send(`Movie "${movieName}" not found.`);
      }

      const result = await Users.updateOne(
        { userName: userName },               // Find the user by username
        { $pull: { FavoriteMovies: movie._id } } // Correct `$pull` syntax
      );
      if (result.modifiedCount > 0) {
        res.status(200).send(`Successfully removed "${movieName}" from ${userName}'s favorites.`);
      } else {
        res.status(404).send(`User "${userName}" or movie "${movieName}" not found.`);
      }
    } catch (err) {
      console.error("Error removing favorite movie:", err);
      res.status(500).send("Internal server error.");
    }
  }

app.delete('/users/:userName/movies/:movieName',passport.authenticate('jwt', { session: false }), 
deleteUserByUsername);

/**
 * @function removeFavoriteMovie
 * @route DELETE /users/:userName/movies/:movieName
 * @summary Remove a movie from user's favorites
 * @security JWT
 * @param {string} userName.path.required - Username
 * @param {string} movieName.path.required - Movie title
 * @returns {string} 200 - Confirmation message
 * @returns {Error} 404/500 - User or movie not found / unexpected error
 */
async function removeFavoriteMovie(req, res) {
  const { userName, movieName } = req.params;

  try {
    const movie = await Movies.findOne({ name: movieName });
    if (!movie) return res.status(400).send(`Movie "${movieName}" not found.`);

    const result = await Users.updateOne(
      { userName },
      { $pull: { FavoriteMovies: movie._id } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send(`Removed "${movieName}" from ${userName}'s favorites.`);
    } else {
      res.status(404).send(`User "${userName}" or movie "${movieName}" not found.`);
    }
  } catch (err) {
    console.error("Error removing favorite movie:", err);
    res.status(500).send("Internal server error.");
  }
}

app.delete('/users/:userName/movies/:movieName', passport.authenticate('jwt', { session: false }), removeFavoriteMovie);


// Get Documentation

app.use('/', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});