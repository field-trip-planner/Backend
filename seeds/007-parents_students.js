exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("parents_students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("parents_students").insert([
        { id: 1, parent_id: 3, student_id: 1 },
        { id: 2, parent_id: 2, student_id: 2 }
      ]);
    });
};
