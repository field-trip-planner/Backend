const express = require("express");
const router = express.Router();
const db = require("../../models/chaperoneModel");
const uuid = require("uuid/v4");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.getChaperones(id);
    // console.log("Testing Duplicate:", data)
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

router.post("/",  async(req, res) => {
    const newChapObj =  {id: uuid(), ...req.body};

  try{
    const data = await db.addChapToFieldTrip(newChapObj)
    res.status(200).json(data);
  }
  catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});


module.exports = router;
