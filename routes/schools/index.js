const express = require('express');
const db = require('../../models/schoolModel/index');
const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const schools = await db.getSchools();
    res.status(200).json(schools)
  }
  catch{
    res.status(500).json({
      message: `error getting schools`,
      error: error
    })
  }
})


module.exports = router;
