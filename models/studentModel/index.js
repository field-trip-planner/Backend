const db = require("../../db");

const getStudents = () => {
  return db("students");
};

const getStudentById = id => {
  return db("students")
    .where({ id })
    .first();
};

<<<<<<< HEAD
const getStudentByParentId = id => {
  return db('students')
    .where({parent_id: id})
    .returning('*');
}

const addStudent = student => {
  return db("students")
=======
const addStudent = async student => {
  const students = await db("students")
>>>>>>> develop
    .insert(student)
    .returning("*");
  const [firstStudent] = students;
  console.log("students", students);
  //return the first student object inserted
  //  from the students array
  return firstStudent;
};

// const addStudent = student => {
//   return db("students")
//     .insert(student)
//     .returning("*");
// };

const updateStudent = (id, changes) => {
  return db("students")
    .where({ id })
    .update(changes);
};

const deleteStudent = id => {
  return db("students")
    .where({ id })
    .del();
};

module.exports = {
  getStudents,
  getStudentById,
  getStudentByParentId,
  addStudent,
  updateStudent,
  deleteStudent
};
