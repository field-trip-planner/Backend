exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users_field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users_field_trips").insert([
        { id: 1, user_id: 2, field_trip_id: 1, isChaperone: false },
        { id: 2, user_id: 1, field_trip_id: 1, isChaperone: true },
        { id: 3, user_id: 3, field_trip_id: 1, isChaperone: true }
      ]);
    });
};
