exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        {
          id: "abe4c79f-c02b-486b-b7c2-2f70ea64b1ea",
          first_name: "Steve",
          last_name: "Rogers",
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          teacher_id: "59495f61-f31c-444d-a284-b2233e5aa914"
        },
        {
          id: "c8f552db-b1cd-4310-86a5-cc0ffc2e4fe9",
          first_name: "Tony",
          last_name: "Stark",
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          teacher_id: "59495f61-f31c-444d-a284-b2233e5aa914"
        },
        {
          id: "1611836b-c4b6-4fd8-9174-7bcc1b16272a",
          first_name: "Bruce",
          last_name: "Banner",
          school_id: "9a3e0d6f-1e1a-4894-ae96-5a1b512483ec",
          teacher_id: "456a1336-1ebc-47ab-abb0-4dec6c597442"
        }
      ]);
    });
};
