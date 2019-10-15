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

router.get("/:tripId/statuses/search", async (req, res) => {
  const { tripId } = req.params;
  const {
    query = '',
    perPage = 5,
  } = req.query;

  try {
    const {
      searchedStudentStatus,
      countOnSearchResult,
      totalPagesOnSearchResult
    } = await db.searchStudentStatuses(tripId, query, perPage);

    res.status(200).json({
      searchedStudentStatus,
      countOnSearchResult,
      totalPagesOnSearchResult
    });
  } catch (error) {
    res.status(500).json({
      message: `error getting student for trip id: ${tripId}`,
      error: error
    });
  }
});

router.get("/:tripId/statuses", async (req, res) => {
  const { tripId } = req.params;
  const {
    page = 1,
    perPage = 5,
    sortBy = 'last_name',
    direction = 'asc',
    query = ''
  } = req.query;

  try {
    const {
      totalCount,
      completeStudentStatusesSorted,
      totalPages
    } = await db.getStudentStatusesByTripIdPaginated(tripId, page, perPage, sortBy, direction, query);

    res.status(200).json({
      completeStudentStatusesSorted,
      totalCount,
      totalPages,
      perPage: Number(perPage)
    });
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

  // console.log("studentStatus::", updatedStatus);
  // console.log("studentStatusId::", studentStatusId);
  try {
    const studentStatus = await db.updateStudentsFieldtrips(studentStatusId, updatedStatus);
    console.log("studentStatus::", studentStatus);

    const isGoing = studentStatus.paid_status &&
      studentStatus.permission_status &&
      studentStatus.supplies_status;
    const studentStatusWithUpdatedGoingStatus = await db.updateStudentsFieldtrips(studentStatusId, {going_status: isGoing})

    res.status(200).json(studentStatusWithUpdatedGoingStatus);

  } catch (error) {
    res.status(500).json({
      message: `error updating student status`,
      error: error
    });
  }
});

router.delete("/:studentStatusId", async (req, res) => {
  const { studentStatusId } = req.params;

  try {
    const deletedStudent = await db.deleteStudentsFieldtrips(studentStatusId);

    res.status(200).json({
      deletedStudent,
      message: `Student with fieldtrip id ${studentStatusId} has been deleted`
    });

  } catch (error) {
    res.status(500).json({
      message: `error deleting student from field trip`,
      error
    })
  }
})

module.exports = router;
