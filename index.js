const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require('morgan');


// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));


app.get('/' , (req , res) => {
  res.send('Welcome to the test.');
});

app.get('/movies', (req, res) => {
  const filePath = path.join(__dirname, 'movies.json'); // Ensure you have a movies.json file in the same directory
  console.log(filePath)
  // Read the movies.json file and send the content as a JSON response
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read movies file' });
    } else {
      res.json(JSON.parse(data)); // Convert the file contents to JSON and send it
    }
  });
});

app.use('/',express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});