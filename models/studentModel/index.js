const db = require("../../db");

const getStudents = () => {
  return db("students");
};

const getStudentById = id => {
  return db("students")
    .where({ id })
    .first();
};

const addStudent = student => {
  return db("students")
    .insert(student)
    .returning("*");
};

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
  addStudent,
  updateStudent,
  deleteStudent
};
