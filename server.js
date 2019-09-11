require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require('passport');
const keys = require('./authenticationConfig/keys');

const server = express();

//Imports passport configuration
const passportSetup = require('./authenticationConfig/passport-setup');
//Cookie Session setup
// const cookieSession = require('cookie-session');
//old code
// define router paths
const FieldTripRouter = require('./routes/fieldtrips');
const SchoolsRouter = require('./routes/schools');
const StudentsRouter = require('./routes/students');
const UsersRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//Cookie Session
// server.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   //1 day for expiration period
//   keys: [keys.session.cookieKey],
//   httpOnly: false
//   //keys are the strings used to encrypt the user sensitive data in
//   //a cookie
// }));
//old code

//initialize passport
server.use(passport.initialize());
server.use(passport.session());

// router obj is isolated instance
server.use('/fieldtrips', FieldTripRouter);
server.use('/schools', SchoolsRouter);
server.use('/students', StudentsRouter);
server.use('/users',UsersRouter);
server.use('/auth', AuthRouter)
server.use('/profile', profileRouter )


server.set('view engine', 'ejs');


server.get("/", (req, res) => {
  // res.status(200).json("Server is up");
  res.render('home');
});

module.exports = server;
