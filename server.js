require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

//Imports passport configuration
const passportSetup = require('./authenticationConfig/passport-setup');

// define router paths
const FieldTripRouter = require('./routes/fieldtrips');
const SchoolsRouter = require('./routes/schools');
const StudentsRouter = require('./routes/students');
const UsersRouter = require('./routes/users');
const LoginRouter = require('./routes/login');

// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// router obj is isolated instance
server.use('/fieldtrips', FieldTripRouter);
server.use('/schools', SchoolsRouter);
server.use('/students', StudentsRouter);
server.use('/users',UsersRouter);
server.use('/auth', LoginRouter)

server.set('view engine', 'ejs');


server.get("/", (req, res) => {
  // res.status(200).json("Server is up");
  res.render('home');
});

module.exports = server;
