const express = require("express");
const mw = require("../../middleware");
const uuid = require("uuid/v4");
const db = require("../../models/userModel");
const router = express.Router();

router.post("/", mw.hash, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  try {
    if (!first_name || !last_name || !email) {
      res.status(400).json({ message: "Please enter required fields" });
    } else {
      const user = { id: uuid(), ...req.body };
      const data = await db.addUser(user);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});
module.exports = router;
