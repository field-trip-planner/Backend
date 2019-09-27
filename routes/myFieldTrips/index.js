const express = require("express");
const db = require("../../models/field_tripModel/index");
const studentModel = require("../../models/studentModel");
const studentsFieldTripsModel = require("../../models/students_fieldtripsModel");
const chaperonesFieldTripsModel = require("../../models/chaperones_field_tripsModel");
const router = express.Router();


//Handler functions to chain additional database requests to other tables
//-----------------------------------------------------------------------------------------------------
async function handleChaperonesFieldTrips(arr) {
  let fieldTripsList = [];
  for (let i = 0; i < arr.length; i++) {
    fieldTripsList.push(await db.getFieldTripById(arr[i]));
  }
  console.log(fieldTripsList)
  return fieldTripsList;
}

async function handleParentFieldTrips(arr) {
  let fieldTripsList = [];
  for (let i = 0; i < arr.length; i++) {
    fieldTripsList.push(await db.getFieldTripById(arr[i].field_trip_id));
  }
  return fieldTripsList;
}

async function handleStudentFieldTrips(arr) {
  let fieldTripsList = [];
  for (let i = 0; i < arr.length; i++) {
    // fieldTripsList.push(await studentsFieldTripsModel.getStudentsFieldtripsByStudentId(arr[i]));
    let studentFieldTrips = await studentsFieldTripsModel.getStudentsFieldtripsByStudentId(arr[i]);
    for (let z = 0; z < studentFieldTrips.length; z++) {
      fieldTripsList.push(studentFieldTrips[z])
    }
  }
  // return fieldTripsList;
  // return await handleParentFieldTrips(fieldTripsList);
  return { parentsFieldTrips: await handleParentFieldTrips(fieldTripsList), studentFieldTrips: fieldTripsList }
}
//-----------------------------------------------------------------------------------------------------



//get teacher's field trips(this will be done by getting all field trips by teacher id)

router.get("/teacher/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const teacherFieldTrips = await db.getFieldTripsByTeacherId(id);
    if (teacherFieldTrips) {
      res.status(200).json(teacherFieldTrips);
    } else {
      res
        .status(404)
        .json({ message: `The teacher has no field trips` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
})


//get chaperone field trips(this will be done by getting the field trip ids associated with the chaperone's id, and then getting all the field trips associated with their related field trip ids)

router.get("/chaperone/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const chaperoneFieldTrips = await chaperonesFieldTripsModel.getChaperoneFieldTripsById(id);
    if (chaperoneFieldTrips) {

      const chaperoneFieldTripIds = [];

      chaperoneFieldTrips.forEach(chaperone => {
        chaperoneFieldTripIds.push(chaperone.field_trip_id)
      });

      const fieldTrips = await handleChaperonesFieldTrips(chaperoneFieldTripIds);
      console.log('field trips here', fieldTrips)
      res.status(200).json(fieldTrips)
    } else {
      res
        .status(404)
        .json({ message: `The chaperone has no field trips` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});


/*get parent's field trips(This will be done by finding the student associated with parent, then finding the field trip ids associate with that student, and then finding the field trips associated with those ids)*/

router.get("/parent/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const parentStudents = await studentModel.getStudentByParentId(id);
    if (parentStudents) {
      const studentIds = [];

      parentStudents.forEach(student => {
        studentIds.push(student.id);
      });

      const fieldTrips = await handleStudentFieldTrips(studentIds);
      // res.status(200).json(fieldTrips);
      // let fieldTripsWithStudents = fieldTrips.parentsFieldTrips;\

      let students = parentStudents;
      let fieldTripsWithParents = [];
      fieldTrips.parentsFieldTrips.forEach(fieldTrip => {
        if (!fieldTripsWithParents.length) {
          fieldTripsWithParents.push({ ...fieldTrip, students: [] })
        } else {
          fieldTripsWithParents.forEach(addedFieldTrip => {
            if (!addedFieldTrip.id === fieldTrip.id) {
              fieldTripsWithParents.push({ ...fieldTrip, students: [] })
            }
          })
        }
      })
      console.log(fieldTripsWithParents)

      fieldTripsWithParents.forEach(parentFieldTrip => {
        fieldTrips.studentFieldTrips.forEach(studentFieldTrip => {
          if (parentFieldTrip.id === studentFieldTrip.field_trip_id) {
            for (let i = 0; i < students.length; i++) {
              if (studentFieldTrip.student_id === students[i].id) {
                parentFieldTrip.students = [...parentFieldTrip.students, { ...students[i] }];
                // console.log(parentFieldTrip.students)

                let mainSlice = students.slice(0, i);
                let slice2 = students.slice(i + 1)
                slice2.forEach(item => {
                  mainSlice.push(item);
                });
                students = mainSlice;
                break;
              } else {
                continue;
              }
            }
          }
        })
      })
      console.log(fieldTripsWithParents[0].students)

      // res.status(200).json({fieldTrips: fieldTripsWithParents, parentStudents: parentStudents, studentsToFieldTrips: fieldTrips.studentFieldTrips })
      res.status(200).json(fieldTripsWithParents);
    } else {
      res
        .status(404)
        .json({ message: `The parent has no students` });
    }

  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
})



module.exports = router;
