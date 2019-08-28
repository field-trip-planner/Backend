require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
// const db = require("./models/schoolModel");
// const db = require("./models/field_tripModel");

// define router paths
const FieldTripRouter = require('./routes/fieldtrips');
const SchoolsRouter = require('./routes/schools');
const StudentsRouter = require('./routes/students');
const UsersRouter = require('./routes/users');

// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// router obj is isolated instance
server.use('/fieldtrips', FieldTripRouter);
server.use('/schools', SchoolsRouter);
server.use('/students', StudentsRouter);
server.use('/users',UsersRouter);

server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
