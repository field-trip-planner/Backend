const db = require("../../db");

const getStudentsFieldtrips = () => {
  return db("students_field_trips");
};

const getStudentsFieldtripsById = id => {
  return db("students_field_trips")
    .where({ id })
    .first();
};

const getStudentStatusesByTripIdPaginated = async (tripId, page, perPage, sortBy, direction ) => {
  const offset = (page - 1) * perPage;

  const completeStudentStatusesSorted = await db("students_field_trips")
    .join('students', 'students_field_trips.student_id', 'students.id')
    .select('students.*',
      'students_field_trips.*', // students_field_trips.id overwrites student.id
      'students.id as student_id'
    )
    .where({ field_trip_id: tripId }).orderBy(sortBy, direction).offset(offset).limit(perPage);

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

const getStudentsFieldtripStatusById = id => {
  return db("students_field_trips")
    .where({ id : id }).first();
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
  getStudentsFieldtripStatusById,
  getStudentsFieldtripsByStudentId,
  addStudentsFieldtrips,
  updateStudentsFieldtrips,
  deleteStudentsFieldtrips,
  getStudentStatusesByTripIdPaginated
};
