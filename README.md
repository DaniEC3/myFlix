myFlix API
A web application that provides users with information about movies, directors, and genres. Users can create accounts, update their profiles, add or remove favorite movies, and access a comprehensive collection of films.

Features
User Authentication:
Users can register, log in, and authenticate using JSON Web Tokens (JWT).

User Management:

Register a new user.
Update user details such as username, password, or email.
Delete a user profile.
Movie Database:

Get detailed information about movies, genres, and directors.
Add movies to a user's list of favorites.
Remove movies from a user's list of favorites.
Logging:

Morgan is used to log HTTP requests to the console.
Logs are stored persistently using the File System (fs) module for debugging and auditing purposes.
Technologies Used
Backend:

Node.js
Express.js
Database:

MongoDB (Atlas & local setup)
Authentication & Authorization:

Passport.js
JWT (JSON Web Tokens)
Validation:

express-validator
Logging:

Morgan (HTTP request logger)
File System (for saving logs)
Development Tools:

Postman (for API testing)
Endpoints Overview
Users
POST /users/create

Register a new user.
Required fields:
userName: Must be alphanumeric and at least 5 characters long.
password: Must include at least 8 characters, one number, one uppercase, one lowercase, and one special character.
email: Must be a valid email address.
PUT /users/update/:userName

Update user information (e.g., email or password).
DELETE /users/delete/:userName

Delete a user account.
Movies
GET /movies

Get a list of all movies.
GET /movies/:title

Get information about a specific movie by title.
GET /genres/:name

Get detailed information about a genre.
GET /directors/:name

Get detailed information about a director.
Favorite Movies
POST /users/:userName/movies/:movieId

Add a movie to a user's favorites list.
DELETE /users/:userName/movies/:movieId

Remove a movie from a user's favorites list.
Setup and Installation
Prerequisites
Ensure you have the following installed on your machine:

Node.js
MongoDB (local or Atlas setup)
Installation Steps
Clone the repository:

bash
Copy code
git clone <repository_url>  
cd myFlix  
Install dependencies:

bash
Copy code
npm install  
Set up your MongoDB connection:

Update your MongoDB connection URI in the project. For example:
javascript
Copy code
const uri = 'mongodb+srv://<username>:<password>@moviesdata.mongodb.net/myFlixDB';
Enable logging with Morgan and File System:

Morgan is preconfigured to log HTTP requests in the console.
Logs are saved in a log.txt file using the File System module.
Code snippet:

javascript
Copy code
const morgan = require('morgan');  
const fs = require('fs');  
const path = require('path');  

// Create a write stream for the logs  
const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });  

// Use Morgan to log requests  
app.use(morgan('combined', { stream: logStream }));  
Start the server:

bash
Copy code
npm start  
Test the API using tools like Postman or cURL.

Authentication
All secured endpoints require a valid JWT token. Pass the token in the Authorization header as:

php
Copy code
Bearer <your_token>
Example API Usage
Register a User
POST /users/create

json
Copy code
{
  "userName": "JohnDoe",
  "password": "P@ssword123",
  "email": "johndoe@example.com"
}
Add a Favorite Movie
POST /users/JohnDoe/movies/63ef12b4fca53b74ff3d7e91

json
Copy code
Authorization: Bearer <your_token>
Remove a Favorite Movie
DELETE /users/JohnDoe/movies/63ef12b4fca53b74ff3d7e91

json
Copy code
Authorization: Bearer <your_token>
Get All Movies
GET /movies

Error Handling
400 Bad Request: Missing or invalid parameters in the request.
401 Unauthorized: Invalid or missing JWT token.
404 Not Found: Resource not found (e.g., movie, user).
500 Internal Server Error: Server-side issue.
Future Enhancements
Add client-side support for React.js.
Implement additional filtering and sorting options for movies.
Add support for social login (e.g., Google, Facebook).
License
This project is licensed under the MIT License.

Contact
If you have questions or suggestions, please contact:
Name: Daniel
Email: daniel@example.com
