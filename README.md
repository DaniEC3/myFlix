# **myFlix API**

A comprehensive web application providing users with detailed information about movies, genres, and directors. Users can sign up, log in, manage their profiles, and create a list of favorite movies. This API is designed for seamless integration with both client-side and server-side applications.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation](#installation)  
4. [API Endpoints](#api-endpoints)  
5. [Example Requests](#example-requests)  
6. [Logging](#logging)  
7. [Error Handling](#error-handling)  
8. [Future Enhancements](#future-enhancements)  
9. [License](#license)  
10. [Contact](#contact)

---

## **Features**

- **User Management**:  
  - Register, log in, and authenticate users using JSON Web Tokens (JWT).  
  - Update user details (e.g., username, email, password).  
  - Delete user accounts.

- **Movies and Favorites**:  
  - Access a database of movies, genres, and directors.  
  - Add or remove movies from a user's list of favorites.

- **Security**:  
  - Passwords are hashed for secure storage.  
  - API endpoints are protected using Passport.js with JWT strategy.

- **Logging**:  
  - **Morgan** for HTTP request logging in the console.  
  - Persistent logs stored using Node.js's **File System (fs)** module for auditing.

---

## **Technologies Used**

- **Backend**:  
  - Node.js  
  - Express.js  

- **Database**:  
  - MongoDB (Atlas & local setup)  

- **Authentication & Authorization**:  
  - Passport.js  
  - JWT  

- **Validation**:  
  - express-validator  

- **Logging**:  
  - Morgan  
  - File System (fs)  

- **Development Tools**:  
  - Postman (for API testing)

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
   cd myFlix
3. Set up your MongoDB connection in the project:
   Update your MongoDB URI in the codebase. For example:
   ```bash
   const uri = 'mongodb+srv://<username>:<password>@moviesdata.mongodb.net/myFlixDB';
4. Start the server:
   ```bash
   npm start
5. Test the API using Postman or a similar tool
 
## **API Endpoints**

### **User Endpoints**

- **Register a user**:  
  - `POST /users/create`

- **Update user details**:  
  - `PUT /users/update/:userName`

- **Delete user account**:  
  - `DELETE /users/delete/:userName`

### **Movies Endpoints**

- **Get all movies**:  
  - `GET /movies`

- **Get movie by title**:  
  - `GET /movies/:movieTitle`

- **Add a movie to favorites**:  
  - `POST /users/:userName/movies/:movieTitle`

- **Remove a movie from favorites**:  
  - `DELETE /users/:userName/movies/:movieTitle`

---

## **Example Requests**

### **Add a movie to favorites**

```bash
POST /users/TheGratoNE/movies/Inception






















