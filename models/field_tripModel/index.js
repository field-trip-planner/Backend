const db = require("../../db");

async function getFieldTrips() {
  return await db("field_trips");
}

async function getFieldTripById(id) {
  return await db("field_trips")
    .where({ id })
    .first();
}

<<<<<<< HEAD
//Get Teachers Field Trips

async function getFieldTripsByTeacherId(id) {
  return await db("field_trips")
  .where({creator_id: id});
}



//Get Chaperones Field Trips




=======
// async function getFieldTripByTeacherId(id){

// }
>>>>>>> develop

async function addFieldTrip(newTrip) {
  return db("field_trips")
    .insert(newTrip)
    .returning(["id", "name"]);
}

async function updateFieldTrip(id, updates) {
  return await db("field_trips")
    .where({ id })
    .update(updates);
}

async function deleteFieldTrip(id) {
  return await db("field_trips")
    .where({ id })
    .del();
}

module.exports = {
  getFieldTrips,
  getFieldTripById,
  getFieldTripsByTeacherId,
  addFieldTrip,
  updateFieldTrip,
  deleteFieldTrip
};
