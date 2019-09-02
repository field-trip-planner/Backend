require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const mw = require("./middleware");
require("./config")(passport);

const server = express();

// Express Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
server.use(passport.initialize());
server.use(passport.session());

// define router paths
const FieldTripRouter = require("./routes/fieldtrips");
const SchoolsRouter = require("./routes/schools");
const StudentsRouter = require("./routes/students");
const UsersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

// router obj is isolated instance
server.use("/fieldtrips", mw.checkAuth, FieldTripRouter);
server.use("/schools", mw.checkAuth, SchoolsRouter);
server.use("/students", mw.checkAuth, StudentsRouter);
server.use("/users", mw.checkAuth, UsersRouter);
server.use("/login", loginRouter);

server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
