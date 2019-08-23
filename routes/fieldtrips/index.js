const express = require('express');
const db = require('../../models/field_tripModel/index');
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

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const fieldtrips = await db.getFieldTripById(id);
        if(fieldtrips) {
            res.status(200).json(fieldtrips);
        } else {
            res.status(404).json({message: `the fieldtrip with id ${id} does not exist`})
        }
    }
    catch{
        res.status(500).json({
            message: `fieldtrips Server Error `,
            error: error 
         })
     }

})

module.exports = router;
