const db = require("../../db");

async function getFieldTrips() {
  return await db("field_trips");
}

async function getFieldTripById(id) {
  return await db("field_trips")
    .where({ id })
    .first();
}

//Get Teacher's Field Trips
async function getFieldTripsByTeacherId(id) {
  return await db("field_trips")
  .where({creator_id: id});
}

async function addFieldTrip(newTrip) {
  return db("field_trips")
    .insert(newTrip)
    .returning("*");
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
