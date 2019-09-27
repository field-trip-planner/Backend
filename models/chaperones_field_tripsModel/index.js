const db = require("../../db");


//Get Chaperone's Field Trips
async function getChaperoneFieldTripsById(id){
  return await db("chaperones_field_trips")
  .where({user_id:id})
}



module.exports = {
  getChaperoneFieldTripsById,
};
