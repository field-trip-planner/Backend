const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login/failed"
  }),
  function(req, res) {
    const user = {
      ...req.user,
      password: ""
    };
    res.status(200).json({ message: "Logged in", user: user });
  }
);

router.get("/failed", (req, res) => {
  res.status(401).json("Login Failed");
});

module.exports = router;
