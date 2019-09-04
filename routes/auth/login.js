const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login/failed" }),
  function(req, res) {
    res.status(200).json({ message: "Logged in" });
  }
);

router.get("/failed", (req, res) => {
  res.status(401).json("Login Failed");
});

router.get("/test", (req, res) => {
  res.status(401).json("Not Logged In");
});

module.exports = router;
