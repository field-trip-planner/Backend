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

function compareValues(key, order) {
  return function(a, b) {
    if(!a.hasOwnProperty(key) ||
      !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ?
        (comparison * -1) : comparison
    );
  };
}

router.get("/:tripId/statuses", async (req, res) => {
  const { tripId } = req.params;
  const { page = 1, perPage = 5, sortBy = 'last_name', direction = 'asc' } = req.query;

  try {
    const {
      totalCount,
      studentStatuses,
      totalPages
    } = await db.getStudentStatusesByTripIdPaginated(tripId, page, perPage); // 1

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

    // Sorted List of the completeStudentStatuses
    const completeStudentStatusesSorted =
      [...completeStudentStatuses].sort(compareValues(sortBy, direction));

    res.status(200).json({completeStudentStatusesSorted, totalCount, totalPages});
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
