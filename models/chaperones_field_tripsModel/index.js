const db = require("../../db");

//Get Chaperone's Field Trips
function getChaperoneFieldTripsById(id){
  return db("chaperones_field_trips")
  .where({ user_id: id });
}

module.exports = {
  getChaperoneFieldTripsById,
};
