

// const User = require('../models/userModel');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   console.log(id)
//   const user = await User.getUserById(id)
//   done(null, user);
// });

// passport.use(new GoogleStrategy({
//   //options for this strategy
//   clientID: keys.google.clientID,
//   clientSecret: keys.google.clientSecret,
//   callbackURL: '/auth/google/redirect'
// }, async (accessToken, refreshToken, profile, done) => {
  

//   //check if user exists in db

//   const data = await User.getUserByGoogleId(profile.id)
//   if (data) {
//     //user exists
//     console.log('user is', data)
//     done(null, data);
//   } else {
//     //if not, create user
//       const newUser = await User.addUser({
//         id: 13,
//         googleId: profile.id,
//         first_name: profile.name.givenName,
//         last_name: profile.name.familyName,
//         email: 'hiiiisiai',
//         password: '123',
//         username: profile.displayName,
//         isTeacher: false,
//         school_id: 1,
//         phone_number: '1232ss3aaa'
//       });

//       console.log('new user created', newUser);
//       done(null, newUser);
    
//  
// }));
//old code

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },
  (token, refreshToken, profile, done) => {
    console.log('hello here', profile)
    return done(null, {
      profile: profile,
      token: token
    });
  }));
};