const express = require('express');
const db = require('../../models/schoolModel/index');
const router = express.Router();

// GET Schools
router.get('/', async (req, res) => {
  try {
    const schools = await db.getSchools();

    if (schools.length) {
      res.status(200).json(schools)

    } else {
      res.status(404).json({message: `No schools found`})
    }
  }
  catch (err) {
    res.status(500).json({error: `Unable to retrieve schools`})
  }
})

module.exports = router;
