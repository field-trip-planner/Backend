const db = require("../../db");

const getUsers = () => {
  return db("users");
};

const getUserById = id => {
  return db("users")
    .where({ id })
    .first();
};

const getUserByGoogleId = googleId => {
  return db("users")
    .where({ googleId })
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

async function testDB() {
  try {
    const data = await getUsers();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

testDB();

module.exports = {
  getUsers,
  getUserById,
  getUserByGoogleId,
  addUser,
  updateUser,
  deleteUser
};
