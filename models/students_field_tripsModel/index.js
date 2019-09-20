const db = require('../../db');
const studentModel = require("../studentModel");


const getParentStudentFieldTrips = async id => {
  return await studentModel.getStudentByParentId(id);
}


// const addSchool = async school => {
//   const schoolObject = await db("schools")
//     .insert(school)
//     .returning("*");
//   const [newSchool] = schoolObject;
//   return newSchool;
// };

module.exports = {
  getParentStudentFieldTrips
}