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

// GET School by Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const school = await db.getSchoolById(id);

    if (!school) {
      return res.status(404).json({message: 'school not found'});
    }

    res.status(200).json(school);
  }
  catch (err) {
    res.status(500)
      .json({
        err,
        message: 'Unable to process request'
      })
  }
});

module.exports = router;
