const db = require("../../db");

const getStudentsFieldtrips = () => {
  return db("students_field_trips");
};

const getStudentsFieldtripsById = id => {
  return db("students_field_trips")
    .where({ id })
    .first();
};

const getStudentStatusesByTripId = tripId => {
  return db("students_field_trips")
    .where({ field_trip_id: tripId })
    .returning("*");
};


const addStudentsFieldtrips = async studentStatus => {
  const newStatus = await db("students_field_trips")
    .insert(studentStatus)
    .returning("*");

  const [ firstStudentStatus ] = newStatus;
  return firstStudentStatus;
};

// const addStudentsFieldtrips = studentStatus => {
//   return db("students_field_trips")
//     .insert(studentStatus)
//     .returning("*");
// };

const updateStudentsFieldtrips = async (id, changes) => {
  const updatedStudentStatus = await db("students_field_trips")
    .where({ id })
    .update(changes)
    .returning("*");
  // const [ firstStudentStatus ] = updatedStudentStatus;
  return updatedStudentStatus[0];
};

const deleteStudentsFieldtrips = id => {
  return db("students_field_trips")
    .where({ id })
    .del();
};

module.exports = {
  getStudentsFieldtrips,
  getStudentsFieldtripsById,
  getStudentStatusesByTripId,
  addStudentsFieldtrips,
  updateStudentsFieldtrips,
  deleteStudentsFieldtrips
};
