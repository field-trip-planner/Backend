const express = require("express");
const uuid = require("uuid/v4");
const db = require("../../models/field_tripModel/index");
const studentModel = require("../../models/studentModel");
const studentsFieldTripsModel = require("../../models/students_fieldtripsModel")
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const fieldtrips = await db.getFieldTrips();
    res.status(200).json(fieldtrips);
  } catch (error) {
    res.status(500).json({
      message: `error getting fieldtrips`,
      error: error
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fieldtrips = await db.getFieldTripById(id);
    if (fieldtrips) {
      res.status(200).json(fieldtrips);
    } else {
      res
        .status(404)
        .json({ message: `the fieldtrip with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

//get teacher field trips
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


// async function getChaperones(id) {
//   try {
//     const data = await db("chaperones_field_trips").where({
//       field_trip_id: id
//     });
//     const userIDs = [];
//     data.forEach(d => {
//       return userIDs.push(d.user_id);
//     });
//     const users = mapUsers(userIDs);
//     return users;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function mapUsers(arr) {
//   let data = [];
//   for (i = 0; i < arr.length; i++) {
//     data.push(await dbUsers.getUserById(arr[i]));
//   }
//   return data;
// }





async function handleChaperonesFieldTrips(arr) {
  let fieldTripsList = [];
  for (let i = 0; i < arr.length; i++) {
    fieldTripsList.push(await db.getFieldTripById(arr[i]));
  }
  console.log(fieldTripsList)
  return fieldTripsList;
}

//get chaperone field trips by their id
router.get("/chaperone/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const chaperoneFieldTrips = await db.getChaperoneFieldTripsById(id);
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


async function handleStudentFieldTrips(arr){
  let fieldTripsList = [];
  for(let i = 0; i < arr.length; i++){
    fieldTripsList.push(await studentsFieldTripsModel.getStudentsFieldtripsByStudentId(arr[i]));
  }
  return fieldTripsList;
}



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
      res.status(200).json(fieldTrips);
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





router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allFieldTrips = await db.deleteFieldTrip(id);
    console.log(">>>>>>>>", allFieldTrips);

    if (allFieldTrips) {
      res.status(200).json({
        message: `Field Trip with id ${id} has been deleted`
      });
    } else {
      res
        .status(404)
        .json({ message: `the fieldtrip with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

router.post("/", async (req, res) => {
  const { name, date, address, supplies, cost, field_trip_details } = req.body;
  const newTrip = { id: uuid(), ...req.body };

  try {
    if (
      name === "" ||
      date === "" ||
      address === "" ||
      supplies === "" ||
      cost === "" ||
      field_trip_details === ""
    ) {
      res
        .status(400)
        .json({ message: `Please provide all required input fields` });
    } else {
      const fieldTrip = await db.addFieldTrip(newTrip);
      res.status(201).json(fieldTrip);
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

router.put("/:id", async (req, res) => {
  const updatedTripInfo = req.body;
  const { id } = req.params;

  try {
    const fieldTripUpdated = await db.updateFieldTrip(id, updatedTripInfo);

    if (fieldTripUpdated) {
      res.status(200).json(updatedTripInfo);
    } else {
      res.status(404).json({
        message: `Field Trip with id ${id} does not exist`
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `fieldtrips Server Error `,
      error: error
    });
  }
});

module.exports = router;
