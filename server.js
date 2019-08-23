require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
// const db = require("./models/schoolModel");
// const db = require("./models/field_tripModel");

// define router paths
const FieldTripRouter = require('./routes/fieldtrip-router');


// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// router obj is isolated instNCE
server.use('/fieldtrips', FieldTripRouter);


server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
