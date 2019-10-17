const db = require("../../db");
const dbStudent = require("../studentModel");

const getStudentsFieldtrips = () => {
  return db("students_field_trips");
};

const getStudentsFieldtripsById = id => {
  return db("students_field_trips")
    .where({ id })
    .first();
};

const searchStudentStatuses = async (tripId, query, perPage) => {
  const searchedStudentStatus = await db("students_field_trips")
    .join('students', 'students_field_trips.student_id', 'students.id')
    .select('students.*',
      'students_field_trips.*', // students_field_trips.id overwrites student.id
      'students.id as student_id'
    )
    .where({field_trip_id: tripId})
    .where((builder)=> {
      builder.where("first_name", "ilike", `%${query}%`)
        .orWhere("last_name", "ilike", `%${query}%`);
    });

  const searchedStudentsPerPageResult = await db("students_field_trips")
    .join('students', 'students_field_trips.student_id', 'students.id')
    .select('students.*',
      'students_field_trips.*',
      'students.id as student_id'
    )
    .where({field_trip_id: tripId})
    .where((builder)=> {
      builder.where("first_name", "ilike", `%${query}%`)
        .orWhere("last_name", "ilike", `%${query}%`);
    })
    .limit(perPage);

  // to keep in mind:
  /*
  https://github.com/knex/knex/issues/233
  Queries using LOWER(column) will not use indexes created for that column, and so a full table scan will be performed, which is obviously bad for all search use cases. To avoid this is to create a new index on LOWER(column).
   */

  // getting total count for the search result
  const countOnSearchResult = searchedStudentStatus.length;
  const totalPagesOnSearchResult = Math.ceil(countOnSearchResult / Number(perPage));

  return {
    searchedStudentStatus: searchedStudentsPerPageResult,
    countOnSearchResult,
    totalPagesOnSearchResult
  }
};

const getStudentStatusesByTripIdPaginated = async (
  tripId,
  page,
  perPage,
  sortBy,
  direction,
  query
) => {
  const offset = (page - 1) * perPage;

  if (!query) {
    const completeStudentStatusesSorted = await db("students_field_trips")
      .join('students', 'students_field_trips.student_id', 'students.id')
      .select('students.*',
        'students_field_trips.*', // students_field_trips.id overwrites student.id
        'students.id as student_id'
      )
      .where({ field_trip_id: tripId })
      .orderBy(sortBy, direction).offset(offset).limit(perPage);

    const incompleteStudentStatus = await db("students_field_trips")
      .join('students', 'students_field_trips.student_id', 'students.id')
      .select('students.*',
        'students_field_trips.*',
        'students.id as student_id'
      )
      .where({ field_trip_id: tripId })
      .andWhere('going_status', '=', 'false');
    const statusIncompleteCount = incompleteStudentStatus.length;
    console.log('statusIncompleteCount:', statusIncompleteCount);

    // getting total count of students in the students_field_trips table
    const countObject = await db("students_field_trips")
      .where({ field_trip_id: tripId }).count().first();
    const totalCount = Number(countObject.count);

    console.log('totalStudents', totalCount);
    const totalPages = Math.ceil(totalCount / Number(perPage));

    return {
      totalCount,
      statusIncompleteCount,
      completeStudentStatusesSorted,
      totalPages
    }
  } else {

    const searchedStudentStatus = await db("students_field_trips")
      .join('students', 'students_field_trips.student_id', 'students.id')
      .select('students.*',
        'students_field_trips.*',
        'students.id as student_id'
      )
      .where({field_trip_id: tripId})
      .andWhereRaw("LOWER(first_name) LIKE '%' || LOWER(?) || '%' ", query)
      .orWhereRaw("LOWER(last_name) LIKE '%' || LOWER(?) || '%' ", query);

    const searchedStudentsPerPageResult = await db("students_field_trips")
      .join('students', 'students_field_trips.student_id', 'students.id')
      .select('students.*',
        'students_field_trips.*',
        'students.id as student_id'
      )
      .where({field_trip_id: tripId})
      .andWhereRaw("LOWER(first_name) LIKE '%' || LOWER(?) || '%' ", query)
      .orWhereRaw("LOWER(last_name) LIKE '%' || LOWER(?) || '%' ", query)
      .orderBy(sortBy, direction)
      .offset(offset).limit(perPage);

    const countOnSearchResult = searchedStudentStatus.length;
    const totalPagesOnSearchResult = Math.ceil(countOnSearchResult / Number(perPage));

    return {
      completeStudentStatusesSorted: searchedStudentsPerPageResult,
      totalCount: countOnSearchResult,
      totalPages: totalPagesOnSearchResult
    }
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

const deleteStudentsFieldtrips = async id => {
  const studentFieldTripToDelete = await db("students_field_trips")
    .where({ id }).first();

  const student = await dbStudent.getStudentById(studentFieldTripToDelete.student_id)

   await db("students_field_trips")
    .where({ id })
    .del();
  return student;
};

module.exports = {
  getStudentsFieldtrips,
  getStudentsFieldtripsById,
  getStudentsFieldtripStatusById,
  getStudentsFieldtripsByStudentId,
  addStudentsFieldtrips,
  updateStudentsFieldtrips,
  deleteStudentsFieldtrips,
  getStudentStatusesByTripIdPaginated,
  searchStudentStatuses
};
