exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        {
          id: 1,
          first_name: "Steve",
          last_name: "Rogers",
          school_id: 1,
          teacher_id: 1
        },
        {
          id: 2,
          first_name: "Tony",
          last_name: "Stark",
          school_id: 2,
          teacher_id: 3
        },
        {
          id: 3,
          first_name: "Alex",
          last_name: "Z",
          school_id: 2,
          teacher_id: 3
        }
      ]);
    });
};
