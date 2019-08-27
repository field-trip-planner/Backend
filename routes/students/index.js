const express = require('express');
const db = require('../../models/studentModel/index');
const router =  express.Router();


router.get('/', async (req, res) => {
    try {
        const students = await db.getStudents();
        res.status(200).json(students);
    } catch(error){
    res.status(500).json({
        message: `error getting students`,
        error: error 
     })
    }

});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const students = await db.getStudentById(id);
        if(students) {
            res.status(200).json(students);
        } else {
            res.status(404).json({message: `the student with id ${id} does not exist`})
        }
    } catch(error){
        res.status(500).json({
            message: `students Server Error `,
            error: error 
         })
     }
})






module.exports = router;