const db = require("../../db");

const getUsers = () => {
  return db("users");
};

const getUserById = id => {
  return db("users")
    .where({ id })
    .first();
};

const getUserBySchoolId = schoolId => {
  return db("users")
  .where({school_id: schoolId, isTeacher: false})
  .orderBy("last_name");
};

const getUserByEmail = email => {
  return db("users")
    .where({ email: email })
    .first();
};

const addUser = user => {
  return db("users")
    .insert(user)
    .returning("*");
};

const updateUser = (id, changes) => {
  return db("users")
    .where({ id })
    .update(changes);
};

const deleteUser = id => {
  return db("users")
    .where({ id })
    .del();
};

module.exports = {
  getUsers,
  getUserById,
  getUserBySchoolId,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
