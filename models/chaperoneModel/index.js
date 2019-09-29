const db = require("../../db");
const dbUsers = require("../userModel");
// const uuid = require("uuid/v4");

// pass in chaperones_field_trips data object
async function getChaperoneData(chaperone) {
  const chaperoneFullData = await dbUsers.getUserById(chaperone.user_id);

  console.log('chaperoneFullData', chaperoneFullData)
  return chaperoneFullData;
}

async function getChaperones(id) {
  try {
    const data = await db("chaperones_field_trips").where({
      field_trip_id: id
    });
    console.log('data:', data);
    const chaperones = await Promise.all(data.map(getChaperoneData));

    console.log('getAllChaperoneData', chaperones)

    // Was looping a second time here
    // const userIDs = [];
    // data.forEach(d => {
    //   return userIDs.push(d.user_id);
    // });
    // const users = mapUsers(userIDs);
    // console.log('users:', users)
    return chaperones;
  } catch (err) {
    console.log(err);
  }
}

// Code below returns an array of promises. This appeared to cause a bug where sometimes duplicate data was being rendered on the FE
// async function mapUsers(arr) {
//   let data = [];
//   for (i = 0; i < arr.length; i++) {
//     data.push(await dbUsers.getUserById(arr[i]));
//   }
//   return data;
// }

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
