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

async function testDB() {
  try {
    const data = await getStudents();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

testDB();

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
