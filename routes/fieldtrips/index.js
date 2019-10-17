const express = require("express");
const uuid = require("uuid/v4");
const db = require("../../models/field_tripModel/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const fieldtrips = await db.getFieldTrips();
    res.status(200).json(fieldtrips);
  } catch (error) {
    res.status(500).json({
      message: `error getting fieldtrips`,
      error: error
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fieldtrips = await db.getFieldTripById(id);
    if (fieldtrips) {
      res.status(200).json(fieldtrips);
    } else {
      res
        .status(404)
        .json({ message: `the fieldtrip with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allFieldTrips = await db.deleteFieldTrip(id);
    console.log(">>>>>>>>", allFieldTrips);

    if (allFieldTrips) {
      res.status(200).json({
        message: `Field Trip with id ${id} has been deleted`
      });
    } else {
      res
        .status(404)
        .json({ message: `the fieldtrip with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    date,
    address,
    supplies,
    cost,
    field_trip_details,
    image,
    largeImage
  } = req.body;
  const newTrip = { id: uuid(), ...req.body };

  try {
    if (
      name === "" ||
      date === "" ||
      address === "" ||
      supplies === "" ||
      cost === "" ||
      field_trip_details === ""
    ) {
      res
        .status(400)
        .json({ message: `Please provide all required input fields` });
    } else {
      const fieldTrip = await db.addFieldTrip(newTrip);
      res.status(201).json(fieldTrip);
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

router.put("/:id", async (req, res) => {
  const updatedTripInfo = req.body;
  const { id } = req.params;

  try {
    const fieldTripUpdated = await db.updateFieldTrip(id, updatedTripInfo);

    if (fieldTripUpdated) {
      res.status(200).json(updatedTripInfo);
    } else {
      res.status(404).json({
        message: `Field Trip with id ${id} does not exist`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

module.exports = router;
