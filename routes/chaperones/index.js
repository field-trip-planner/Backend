const express = require("express");
const router = express.Router();
const db = require("../../models/chaperoneModel");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.getChaperones(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;
