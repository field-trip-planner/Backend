require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require('passport');
const keys = require('./authenticationConfig/keys');

const server = express();

//Imports passport configuration
const passportSetup = require('./authenticationConfig/passport-setup');
passportSetup(passport);
//new code

//Cookie Session setup
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

// define router paths
const FieldTripRouter = require('./routes/fieldtrips');
const SchoolsRouter = require('./routes/schools');
const StudentsRouter = require('./routes/students');
const UsersRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

// Express Middleware
server.use(cors({credentials: true, origin: 'http://localhost:3000'}));
server.use(helmet());
server.use(express.json());

//Cookie Session
server.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  //1 day for expiration period
  keys: [keys.session.cookieKey],
  httpOnly: false
  //keys are the strings used to encrypt the user sensitive data in
  //a cookie
}));

server.use(cookieParser());

//initialize passport
server.use(passport.initialize());
server.use(passport.session());

// router obj is isolated instance
server.use('/fieldtrips', FieldTripRouter);
server.use('/schools', SchoolsRouter);
server.use('/students', StudentsRouter);
server.use('/users',UsersRouter);
server.use('/auth', AuthRouter)


server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
