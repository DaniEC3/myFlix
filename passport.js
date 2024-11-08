const passport = require('passport'),
//takes a username and password from the request body and
//uses Mongoose to check your database for a user with the same username
LocalStrategy = require('passport-local').Strategy,
Models = require('./models.js'),
passportJWT = require('passport-jwt');

let Users = Models.User,
JWTStrategy = passportJWT.Strategy,
ExtractJWT = passportJWT.ExtractJwt;


passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
    },
    async (userName, password, callback) => {
      console.log(`${userName} ${password}`);
      await Users.findOne({ userName: userName })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        if (!user.validatePassword(password)) { //Hash any password entered by the user when 
          //logging in before comparing it to the password stored in MongoDB
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //bearer token
  secretOrKey: 'your_jwt_secret' //You also need to use a “secret” key to verify the signature of the JWT
}, async (jwtPayload, callback) => {
  return await Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));