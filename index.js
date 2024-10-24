const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require('morgan');
const bodyParser = require('body-parser');
uuid = require('uuid'); //Universally Unique Identifier


// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});


app.use(bodyParser.json()); //the data will be expected to be in JSON format 
app.use(morgan('combined', {stream: accessLogStream}));


app.get('/' , (req , res) => {
  res.send('Welcome to the test.');
});

// Return a list of ALL movies to the user

app.get('/movies', (req, res) => {
  const filePath = path.join(__dirname, 'movies.json'); // Ensure you have a movies.json file in the same directory
  // Read the movies.json file and send the content as a JSON response
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read movies file' });
    } else {
      res.json(JSON.parse(data)); // Convert the file contents to JSON and send it
    }
  });
});

// Get data about a single movie by title

app.get('/movies/:name', (req, res) => {
  const movieName = req.params.name; // Access the movie name from the URL
  res.send(`Welcome to the movie: ${movieName}`);
});

// Return data about a genre (description) by name/title 

app.get('/genres/:name', (req, res) => {
  const movieName = req.params.name; // Access the movie name from the URL
  res.send(`The genre: ${movieName}`);
});

// Return data about a director (bio, birth year, death year) by name

app.get('/directors/:name', (req, res) => {
  const movieName = req.params.name; // Access the movie name from the URL
  res.send(`The director: ${movieName}`);
});

// Allow new users to register

app.post('/users/create', (req, res) => {
  let newUser = req.body;

  // Check for the required userName field
  if (!newUser.userName) {
    const message = 'Missing "name" in request body';
    return res.status(400).send(message); // Return early on error
  }

  // Add a unique ID to the new user
  newUser.id = uuid.v4();

  // Send the successful response
  res.status(201).send(`The user: ${newUser.userName} with id: ${newUser.id}`);
});

// Allow users to update their user info (username)

app.put('/users/:user/update/:newUser', (req,res) =>{
  const userName = req.params.newUser; // Access the movie name from the URL
  res.send(`The new user: ${userName}`);
  });

// Allow users to add a movie to their list of favorites

app.post('/users/:userName/movies/:name', (req, res) => {
  let newMovie = req.body;

  // Check for the required userName field
  if (!newMovie.movieName) {
    const message = 'Missing "name" in request body';
    return res.status(400).send(message); // Return early on error
  }
  
  // Send the successful response
  res.status(201).send(`The movie: ${newMovie.movieName} was created`);
});


// Allow users to remove a movie from their list of favorites

app.delete('/users/:userName/movies/:movieName', (req, res) => {
  const movieName = req.params.movieName; // Access the movie name from the URL
  res.send(`The movie: ${movieName} was deleted`);
});

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later).

app.delete('/users/:id', (req, res) => {
  const userid = req.params.id; // Access the movie name from the URL
  res.send(`The user with id: ${userid} was deleted`);
});

// Get Documentation

app.get('/' , (req , res) => {
  res.send('Welcome to the test.');
});

app.use('/',express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});