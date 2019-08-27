const express = require('express');
const db = require('../../models/field_tripModel/index');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const fieldtrips = await db.getFieldTrips();
        res.status(200).json(fieldtrips)
    }
    catch(error){
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
    catch(error){
        res.status(500).json({
            message: `fieldtrips Server Error `,
            error: error 
         })
     }

})

router.post('/', async(req, res) => {
    const {name} = req.body;
    
    try{
        if(name === '') {
            res.status(400).json({message: `Please provide name`});
        } else {
            const fieldTrip = await db.addFieldTrip(req.body);
            res.status(201).json(fieldTrip);
        }
    }
    catch(error){
        res.status(500).json({
            message: `fieldtrips Server Error `,
            error: error 
         })
     }


})


router.put('/:id', async(req, res) => {

    const updatedTripInfo = req.body;
    const {id} = req.params;

    try {
        const fieldTripUpdated = await db.updateFieldTrip(id, updatedTripInfo);

        if(fieldTripUpdated) {
            res.status(200).json(updatedTripInfo);
        } else {
            res.status(404).json({
                message: `Field Trip with id ${id} does not exist`
            })
        }

    }
    catch(error){
        res.status(500).json({
            message: `fieldtrips Server Error `,
            error: error 
         })
     }

});




module.exports = router;
