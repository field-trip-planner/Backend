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

const getStudentStatusesByTripIdPaginated = async (tripId, page, perPage, sortBy, direction ) => {
  const offset = (page - 1) * perPage;

  const completeStudentStatusesSorted = await db("students_field_trips")
    .join('students', 'students_field_trips.student_id', 'students.id')
    .select('students_field_trips.id as id',
      'students.id as student_id',
      'students.first_name',
      'students.last_name',
      'students.school_id',
      'students.created_at',
      'students_field_trips.paid_status',
      'students_field_trips.permission_status',
      'students_field_trips.supplies_status'
    )
    .where({ field_trip_id: tripId }).orderBy(sortBy, direction).offset(offset).limit(perPage);

  console.log('ALLSTUDENTSStatusesJOINSELECT-ASC-BY-DATE:::', completeStudentStatusesSorted);

  // => Desc = newest to oldest

  // getting the count
  const countObject = await db("students_field_trips")
    .where({ field_trip_id: tripId }).count().first();
  const totalCount = Number(countObject.count);

  console.log('totalStudents', totalCount);

  const totalPages = Math.ceil(totalCount / Number(perPage));

  return {
    totalCount,
    completeStudentStatusesSorted,
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
