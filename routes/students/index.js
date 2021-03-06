const express = require("express");
const uuid = require("uuid/v4");
const db = require("../../models/studentModel/index");
const dbFieldTripStudents = require("../../models/students_fieldtripsModel/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await db.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: `error getting students`,
      error: error
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const students = await db.getStudentById(id);
    if (students) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({ message: `the student with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `students Server Error `,
      error: error
    });
  }
});

router.post("/", async (req, res) => {
  const { first_name, last_name, field_trip_id, school_id, parent_id } = req.body;
  const newStudent = { id: uuid(), first_name, last_name, school_id, parent_id };

  try {
    if (first_name === "" || last_name === "") {
      res.status(400).json({ message: `Please provide first AND last name` });
    } else {
      const student = await db.addStudent(newStudent);

      // add to student_field_trips table
      const newStudentStatus = await dbFieldTripStudents.addStudentsFieldtrips({
        id: uuid(),
        student_id: student.id,
        field_trip_id,
        paid_status: false,
        permission_status: false,
        supplies_status: false,
        going_status: false
      });

      // Here in the json response, we're merging student and newStudentStatus
       // where student.id will get overwritten by newStudentStatus.id
        // because we want the student_field_trips id.
         // This is just to match what the student status table expects
      res.status(201).json({...student, ...newStudentStatus});
    }
  } catch (error) {
    res.status(500).json({
      message: `students Server Error `,
      error: error
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allStudents = await db.deleteStudent(id);
    console.log(">>>>>>>>", allStudents);

    if (allStudents) {
      res.status(200).json({
        message: `Student with id ${id} has been deleted`
      });
    } else {
      res
        .status(404)
        .json({ message: `the student with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `student Server Error `,
      error: error
    });
  }
});

router.put("/:id", async (req, res) => {
  const updatedStudentInfo = req.body;
  const { id } = req.params;

  try {
    const studentUpdated = await db.updateStudent(id, updatedStudentInfo);

    if (studentUpdated) {
      res.status(200).json(updatedStudentInfo);
    } else {
      res.status(404).json({
        message: `Student with id ${id} does not exist`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `students Server Error `,
      error: error
    });
  }
});

module.exports = router;
