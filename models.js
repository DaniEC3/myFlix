const mongoose = require('mongoose');

// Movie Schema
let movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  year_released: { type: Date },
  imagePath: { type: String }
});

// User Schema
let userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  first_Name: { type: String },
  last_Name: { type: String },
  email: { type: String, required: true },
  birthDay: { type: Date },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// Director Schema
let directorSchema = mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  birthYear: { type: Date },
  deadYear: { type: Date }
});

// Genre Schema
let genreSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  audience: { type: String }
});

// Models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);

// Export Models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;