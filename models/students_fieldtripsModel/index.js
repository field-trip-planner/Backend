const db = require("../../db");

const getStudentsFieldtrips = () => {
  return db("students_field_trips");
};

const getStudentsFieldtripsById = id => {
  return db("students_field_trips")
    .where({ id })
    .first();
};

// const getStudentStatusesByTripId = async tripId => {
//   const students = await db("students_field_trips")
//     .where({ field_trip_id: tripId }).count().first();
//
//   const totalStudent = Number(students.count);
//   console.log('totalStudents', totalStudent);
//
//   const studentsPerPage = await db("students_field_trips")
//     .where({ field_trip_id: tripId }).offset(2).limit(5);
//
//   console.log('studentsPerPage', studentsPerPage);
//
//   return db("students_field_trips")
//     .where({ field_trip_id: tripId })
//     .returning("*");
// };

const getStudentStatusesByTripIdPaginated = async (tripId, page, perPage) => {
  const offset = (page - 1) * perPage;

  const studentStatuses = await db("students_field_trips")
    .where({ field_trip_id: tripId }).offset(offset).limit(perPage);

    console.log('STUDENTSPerPage:::', studentStatuses);

  // getting the count
  const countObject = await db("students_field_trips")
    .where({ field_trip_id: tripId }).count().first();
  const totalCount = Number(countObject.count);

  console.log('totalStudents', totalCount);

  const totalPages = Math.ceil(totalCount / Number(perPage));

  return {
    totalCount,
    studentStatuses,
    totalPages
  }
};



const getStudentsFieldtripsByStudentId = id => {
  return db("students_field_trips")
    .where({ student_id : id });
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
  // getStudentStatusesByTripId,
  getStudentsFieldtripsByStudentId,
  addStudentsFieldtrips,
  updateStudentsFieldtrips,
  deleteStudentsFieldtrips,
  getStudentStatusesByTripIdPaginated
};
