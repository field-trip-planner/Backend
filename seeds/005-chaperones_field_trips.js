const uuid = require("uuid/v4");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chaperones_field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("chaperones_field_trips").insert([
        {
          id: uuid(),
          user_id: "456a1336-1ebc-47ab-abb0-4dec6c597442",
          field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
        },
        {
          id: uuid(),
          user_id: "456a1336-1ebc-47ab-abb0-4dec6c597440",
          field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
        }
      ]);
    });
};
