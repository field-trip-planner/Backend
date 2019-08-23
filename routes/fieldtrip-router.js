const express = require('express');
const db = require('../models/field_tripModel/index');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const fieldtrips = await db.getFieldTrips();
        res.status(200).json(fieldtrips)
    }
    catch{
       res.status(500).json({
           message: `error getting fieldtrips`,
           error: error 
        })
    }
})


module.exports = router;
