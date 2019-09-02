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
  res.status(400).json("Login Failed");
});

router.get("/test", (req, res) => {
  res.status(300).json("Not Logged In");
});

// router.post("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("/login");
// });
module.exports = router;
