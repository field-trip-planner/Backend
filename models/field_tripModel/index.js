const db = require("../../db");

async function getFieldTrips() {
  return await db("field_trips");
}

async function getFieldTripById(id) {
  return await db("field_trips")
    .where({ id })
    .first();
}

async function addFieldTrip(newTrip) {
  const [id] = await db("field_trips").insert(newTrip);
  return getFieldTripById(id);
  //return db('field_trips').where({ id }).first()
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
 async function testDB() {
   try {
     const data = await getFieldTrips();
     console.log(data);
   } catch (err) {
     console.log(err);
   }
 }
// testDB();

module.exports = {
  getFieldTrips,
  getFieldTripById,
  addFieldTrip,
  updateFieldTrip,
  deleteFieldTrip
};
