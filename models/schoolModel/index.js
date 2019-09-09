const db = require("../../db");

const getSchools = () => {
  return db("schools");
};

const getSchoolById = id => {
  return db("schools")
    .where({ id })
    .first();
};

const updateSchool = (id, changes) => {
  return db("schools")
    .where({ id })
    .update(changes);
};

const deleteSchool = id => {
  return db("schools")
    .where({ id })
    .del();
};

const addSchool = school => {
  return db("schools")
    .insert(school)
    .returning("*");
};

module.exports = {
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
  addSchool
};
