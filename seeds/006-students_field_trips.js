const uuid = require("uuid/v4");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("students_field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students_field_trips").insert([
        {
          id: uuid(),
          student_id: "abe4c79f-c02b-486b-b7c2-2f70ea64b1ea",
          field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
          going_status: true,
          paid_status: true,
          supplies_status: true,
          permission_status: true
        },
        {
          id: uuid(),
          student_id: "c8f552db-b1cd-4310-86a5-cc0ffc2e4fe9",
          field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
          going_status: false,
          paid_status: false,
          supplies_status: false,
          permission_status: false
        },
        {
          id: uuid(),
          student_id: "1611836b-c4b6-4fd8-9174-7bcc1b16272a",
          field_trip_id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
          going_status: true,
          paid_status: true,
          supplies_status: false,
          permission_status: true
        }
      ]);
    });
};
