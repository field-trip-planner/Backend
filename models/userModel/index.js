const db = require("../../db");

const getUsers = () => {
  return db("users");
};

const getUserById = id => {
  return db("users")
    .where({ id })
    .first();
};

//
const getUserBySchoolId = (schoolId) => {
  return db("users")
  .where({school_id: schoolId, role: 'parent'})
  .orderBy("last_name");
};

const getUserChaperoneBySchoolId = schoolId => {
  return db('users')
  .where({school_id: schoolId, role: 'chaperone'})
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
  getUserChaperoneBySchoolId,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
