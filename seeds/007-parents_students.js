exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("parents_students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("parents_students").insert([
        {
          parent_id: "59495f61-f31c-444d-a284-b2233e5aa914",
          student_id: "abe4c79f-c02b-486b-b7c2-2f70ea64b1ea"
        },
        {
          parent_id: "8b4eb7b4-893c-4bb2-8bbe-b75c4223854e",
          student_id: "c8f552db-b1cd-4310-86a5-cc0ffc2e4fe9"
        },
        {
          parent_id: "456a1336-1ebc-47ab-abb0-4dec6c597442",
          student_id: "c8f552db-b1cd-4310-86a5-cc0ffc2e4fe9"
        }
      ]);
    });
};
