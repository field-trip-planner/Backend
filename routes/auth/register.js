const express = require("express");
const mw = require("../../middleware");
const uuid = require("uuid/v4");
const db = require("../../models/userModel");
const router = express.Router();

router.post("/", mw.hash, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const user = await db.getUserByEmail(email);
    if (user) {
      res.status(400);
      res.json({
        error: {
          message: "Email already exists, Please use a different email."
        }
      });
    }
    if (!first_name || !last_name || !email) {
      res.status(400).json({ message: "Please enter required fields" });
    } else {
      const newUser = { id: uuid(), ...req.body };
      const data = await db.addUser(newUser);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});
module.exports = router;
