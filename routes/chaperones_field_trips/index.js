const express = require("express");
const router = express.Router();
const db = require("../../models/chaperones_field_tripsModel");


router.delete("/:fieldTripId/:chaperoneId", async (req, res) => {
  const { fieldTripId, chaperoneId } = req.params;
  const ids = {fieldTripId: fieldTripId, chaperoneId: chaperoneId};

  try {
    const data = await db.deleteChaperoneFieldTripByChaperoneId(ids);
    res.status(200).json({ message: 'Chaperone successfully removed.', data: data });
  } catch (err) {
    res.status.json({ message: 'Error trying to remove chaperone', error: err });
  }

});

module.exports = router;