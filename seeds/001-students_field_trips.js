exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("students_field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students_field_trips").insert([
        {
          id: 1,
          student_id: 1,
          field_trip_id: 1,
          going_status: true,
          paid_status: true,
          supplies_status: true,
          permission_status: true
        },
        {
          id: 2,
          student_id: 2,
          field_trip_id: 1,
          going_status: false,
          paid_status: false,
          supplies_status: false,
          permission_status: false
        },
        {
          id: 3,
          student_id: 3,
          field_trip_id: 2,
          going_status: true,
          paid_status: true,
          supplies_status: false,
          permission_status: true
        }
      ]);
    });
};
