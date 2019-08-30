const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../../models/userModel");
const router = express.Router();

passport.use(
  new LocalStrategy(async function(username, password, done) {
    const data = await db.getUserByUsername(username);
    if (!data) {
      return done(null, false, { message: "Incorrect Username" });
    }
    if (data.password !== password) {
      return done(null, false, { message: "Incorrect Password" });
    }
    passport.serializeUser(function(user, done) {
      return done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
      const data = await db.getUserById(id);
      return done(null, data);
    });

    return done(null, data);
  })
);

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login/failed" }),
  function(req, res) {
    res.redirect("/login/success");
  }
);

// router.post(
//   "/",
//   passport.authenticate("local", {
//     successRedirect: "/login/success",
//     failureRedirect: "/login/failed"
//   })
// );

router.get("/success", (req, res) => {
  console.log(req.user);
  res.status(200).json("Logged in");
});
router.get("/failed", (req, res) => {
  res.status(400).json("Login Failed");
});
module.exports = router;
