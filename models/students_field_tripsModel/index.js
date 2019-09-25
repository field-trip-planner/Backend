const db = require('../../db');
const studentModel = require("../studentModel");



// const handleParentsFieldTrips = async(arr) => {

// }




const getParentStudentFieldTrips = async id => {
  const parentsStudents = await studentModel.getStudentByParentId(id);
  return parentsStudents;

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