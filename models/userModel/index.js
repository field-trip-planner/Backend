const db = require("../../db");

const getUsers = () => {
  return db("users");
};

const getUserById = async id => {
  const userObject = await db("users")
    .where({ id })
    .first();
  return (user = { ...userObject, password: "" });
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
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
