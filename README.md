# **myFlix API**

A comprehensive web application providing users with detailed information about movies, genres, and directors. Users can sign up, log in, manage their profiles, and create a list of favorite movies. This API is designed for seamless integration with both client-side and server-side applications.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [Example Requests](#example-requests)
7. [Logging](#logging)
8. [Error Handling](#error-handling)
9. [Future Enhancements](#future-enhancements)
10. [License](#license)
11. [Contact](#contact)

---

## **Project Overview**

The myFlix API allows users to create an account, update their profile, and manage their list of favorite movies. It provides detailed information about movies, directors, and genres. This application is built using Express.js, MongoDB, and integrates JWT authentication for secure access. The API allows users to interact with their favorite movies, including adding and removing movies from their favorite list.

---

## **Features**

- **User Management**: Sign up, login, update user profile, and delete account.
- **Movie Information**: Retrieve movie details such as genre, director, and release year.
- **Favorites Management**: Users can add and remove movies from their favorites list.
- **Genre and Director Information**: Users can retrieve information about movie genres and directors.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user, movie, genre, and director data.
- **Mongoose**: ODM (Object Document Mapper) for MongoDB.
- **Passport.js**: Middleware for user authentication using JWT (JSON Web Token).
- **Express Validator**: Middleware for validating and sanitizing user input.
- **Morgan**: HTTP request logger for Node.js.
- **File System (fs)**: Used for logging and storing request data.

---

## **Installation**

### **Prerequisites**

1. Install **Node.js** and **npm**:  
   [Download Node.js](https://nodejs.org/)  

2. Set up **MongoDB**:  
   - Use MongoDB Atlas (cloud) or install MongoDB locally.

---

### **Steps to Run Locally**

1. Clone the repository:  
   ```bash
   git clone https://github.com/<your-username>/myFlix.git
   cd myFlix
2. Install dependencies:
   ```bash
   npm install
3. Set up your MongoDB connection in the project:
   Update your MongoDB URI in the codebase. For example:
   ```bash
   const uri = 'mongodb+srv://<username>:<password>@moviesdata.mongodb.net/myFlixDB';
4. Start the server:
   ```bash
   npm start
5. Test the API using Postman or a similar tool

---

## **API Endpoints**

### **User Endpoints**

- **Register a user**:  
  `POST /users/create`
  - Allows a new user to sign up with a username, password, and email.
  
- **Update user details**:  
  `PUT /users/update/:userName`
  - Updates the user's information, such as their password or email.

- **Delete user account**:  
  `DELETE /users/:userID`
  - Deletes the user's account and associated data.

### **Movies Endpoints**

- **Get all movies**:  
  `GET /movies`
  - Retrieves all movies in the database.
  
- **Get a movie by title**:  
  `GET /movies/:movieName`
  - Retrieves details of a specific movie by its title.

- **Add a movie to favorites**:  
  `POST /users/:userName/movies/:movieName`
  - Adds a movie to the user's list of favorite movies.

- **Remove a movie from favorites**:  
  `DELETE /users/:userName/movies/:movieName`
  - Removes a movie from the user's list of favorite movies.

---

## **Example Requests**

### **Add a movie to favorites**

POST `/users/TheGratoNE/movies/Inception`

### **Remove a movie from favorites**

DELETE `/users/TheGratoNE/movies/Inception`

### **Get all movies**

GET `/movies`

### **Get a movie by title**

GET `/movies/Inception`

---

## **Logging**

- The application uses **Morgan** for logging HTTP requests in the console, which helps monitor incoming requests.
- Logs are also stored using **File System (fs)** for auditing purposes, and can be accessed for troubleshooting.

---

## **Error Handling**

- The API uses **express-validator** to validate user input. If there is a validation error, the request will return a `422` status with a detailed error message.
- If an internal error occurs, the server responds with a `500` status code and an error message.

---

## **Future Enhancements**

- Implement additional user profile features such as updating profile images and viewing a history of watched movies.
- Integrate more complex movie recommendations based on user favorites.
- Enhance security features with rate-limiting and more advanced authentication techniques.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For more information, feel free to reach out to the project maintainer:

- **Email**: daniel.escldrn@gmail.com
- **GitHub**: [https://github.com/DaniEC3/myFlix](https://github.com/DaniEC3/myFlix)

























