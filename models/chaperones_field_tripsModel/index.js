const db = require("../../db");

//Get Chaperone's Field Trips
function getChaperoneFieldTripsById(id){
  return db("chaperones_field_trips")
  .where({ user_id: id });
}

function deleteChaperoneFieldTripByChaperoneId(ids){
  const {fieldTripId, chaperoneId} = ids;

  return db("chaperones_field_trips")
  .where({user_id: chaperoneId, field_trip_id: fieldTripId})
  .del()
  .returning("*");

}


module.exports = {
  getChaperoneFieldTripsById,
  deleteChaperoneFieldTripByChaperoneId
};
