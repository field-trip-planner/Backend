const db = require("../../db");
const dbUsers = require("../userModel");

async function getChaperones(id) {
  try {
    const data = await db("chaperones_field_trips").where({
      field_trip_id: id
    });
    const userIDs = [];
    data.forEach(d => {
      return userIDs.push(d.user_id);
    });
    const users = mapUsers(userIDs);
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function mapUsers(arr) {
  let data = [];
  for (i = 0; i < arr.length; i++) {
    data.push(await dbUsers.getUserById(arr[i]));
  }
  return data;
}

// async function execute() {
//   try {
//     const data = await getChaperones("790cb09f-a2e9-420f-a3ac-9d35bdb72118");
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// execute();

module.exports = {
  getChaperones
};
