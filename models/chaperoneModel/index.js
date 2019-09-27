const db = require("../../db");
const dbUsers = require("../userModel");
// const uuid = require("uuid/v4");

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

async function addChapToFieldTrip(newChap) {
  return db('chaperones_field_trips')
  .insert(newChap)
  .returning("*");
}


// async function execute() {
//   try {
//     const data = await addChapToFieldTrip({id: uuid(), user_id: "456a1336-1ebc-47ab-abb0-4dec6c597442",
//       field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118"}
//            );
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// execute();

module.exports = {
  getChaperones,
  addChapToFieldTrip,
};
