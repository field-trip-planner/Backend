require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
