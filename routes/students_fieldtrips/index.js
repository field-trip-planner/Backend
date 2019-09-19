const express = require("express");
const uuid = require("uuid/v4");
const db = require("../../models/students_fieldtripsModel/index");
const dbStudents = require("../../models/studentModel/index");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students_fieldtrips = await db.getStudentsFieldtrips();
    res.status(200).json(students_fieldtrips);
  } catch (error) {
    res.status(500).json({
      message: `error getting students_fieldtrips list`,
      error: error
    });
  }
});

router.get("/:tripId/statuses", async (req, res) => {
  const { tripId } = req.params;

  try {
    const studentStatuses = await db.getStudentStatusesByTripId(tripId); // 1

    const getStudentFromDb = async studentStatus => {
      const student = await dbStudents.getStudentById(studentStatus.student_id);

      return {
        ...student,
        student_id: student.id,
        ...studentStatus
      }
    } // 4

    const getAllStudentStatusesData = async () => {
      return await Promise.all(studentStatuses.map(studentStatus => getStudentFromDb(studentStatus)))
    } // 3

    const completeStudentStatuses = await getAllStudentStatusesData(); // 2

    res.status(200).json(completeStudentStatuses);
  } catch (error) {
    res.status(500).json({
      message: `error getting students statuses for trip id: ${tripId}`,
      error: error
    });
  }
});

// router.post("/", async (req, res) => {
//   const studentStatus = {id: uuid(), ...req.body}
//
//   console.log("studentStatus::", studentStatus);
//
//   try {
//     const newStatus = await db.addStudentsFieldtrips(studentStatus);
//
//     console.log("AFTER-studentStatus::", newStatus);
//
//     res.status(200).json(newStatus);
//
//   } catch (error) {
//     res.status(500).json({
//       message: `error adding student status`,
//       error: error
//     });
//   }
// });

router.put("/:studentStatusId", async (req, res) => {
  const updatedStatus = req.body;
  const { studentStatusId } = req.params;

  console.log("studentStatus::", updatedStatus);
  console.log("studentStatusId::", studentStatusId);
  try {
    const studentStatus = await db.updateStudentsFieldtrips(studentStatusId, updatedStatus);

    console.log("studentStatus::", studentStatus);

    res.status(200).json(studentStatus);

  } catch (error) {
    res.status(500).json({
      message: `error updating student status`,
      error: error
    });
  }
});


module.exports = router;