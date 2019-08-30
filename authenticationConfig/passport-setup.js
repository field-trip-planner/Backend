const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');


passport.use(new GoogleStrategy({
  //options for this strategy
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {

  //check if user exists in db

  const data = await User.getUserByGoogleId(profile.id)
    if (data) {
      //user exists
      console.log('user is', data)
    } else {
      //if not, create user
      User.addUser({
        id: 13,
        googleId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: 'hiiiiii',
        password: '123',
        username: profile.displayName,
        isTeacher: false,
        school_id: 1,
        phone_number: '1232aaa'
      }).then((newUser) => {
        console.log('new user created', newUser)
      })
  }
}));