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

router.post('/', async(req, res) => {
    const {first_name, last_name} = req.body;
    
    try{
     if(first_name === '' || last_name === '') {
           res.status(400).json({message: `Please provide first AND last name`});
       } else {
            const student = await db.addStudent(req.body);
            res.status(201).json(student);
      }
    } catch(error){
        res.status(500).json({
            message: `students Server Error `,
            error: error 
         })
     }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;

    try {
        const allStudents = await db.deleteStudent(id);
        console.log('>>>>>>>>', allStudents);

        if(allStudents) {
            res.status(200).json({ 
                message: `Student with id ${id} has been deleted`
            })
        } else {
            res.status(404).json({message: `the student with id ${id} does not exist`})
        }
    
    } catch(error){
        res.status(500).json({
            message: `student Server Error `,
            error: error 
         })
     }
})

router.put('/:id', async(req, res) => {

    const updatedStudentInfo = req.body;
    const {id} = req.params;

    try {
        const studentUpdated = await db.updateStudent(id, updatedStudentInfo);

        if(studentUpdated) {
            res.status(200).json(updatedStudentInfo);
        } else {
            res.status(404).json({
                message: `Student with id ${id} does not exist`
            })
        }

    } catch(error){
        res.status(500).json({
            message: `students Server Error `,
            error: error 
         })
     }

});

module.exports = router;