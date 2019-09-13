require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const mw = require("./middleware");
const uuid = require("uuid/v4");
const methodOverride = require("method-override");
require("./config")(passport);

const server = express();

// Express Middleware
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
server.use(helmet());
server.use(express.json());
server.use(methodOverride("_method"));
server.use(
  session({
    genid: () => {
      return uuid();
    },
    secret: process.env.SECRET,
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
const loginRouter = require("./routes/auth/login");
const logoutRouter = require("./routes/auth/logout");
const registerRouter = require("./routes/auth/register");

// router obj is isolated instance
server.use("/fieldtrips", mw.checkAuth, FieldTripRouter);
server.use("/schools", SchoolsRouter);
server.use("/students", mw.checkAuth, StudentsRouter);
server.use("/users", mw.checkAuth, UsersRouter);
server.use("/login", loginRouter);
server.use("/logout", logoutRouter);
server.use("/register", registerRouter);

server.get("/", (req, res) => {
  res.status(200).json("Server is up");
});

module.exports = server;
