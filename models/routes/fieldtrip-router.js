const express = require('express');
const FieldTrips = require('../models/field_tripModel/index');
const router = express.Router();

router.get('./', async (req, res) => {
    try{
        res.status(200).json(field_trips)
    }
    catch{
       res.status(500).json({
           message: `error getting fieldtrips`,
           error: error 
        })
    }


})


module.exports = router;
