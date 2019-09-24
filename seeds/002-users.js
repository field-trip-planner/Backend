const uuid = require("uuid/v4");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: "59495f61-f31c-444d-a284-b2233e5aa914",
          first_name: "Mace",
          last_name: "Windu",
          email: "mw@ya.com",
          password:
            "$2a$10$2tnac9eDzYWlUPE8Gs7QeuFRskglSfGJ/xAeApqS.M19NAEnyhHwa",
          role: 'teacher',
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          phone_number: "666-898-1345"
        },
        {
          id: "59495f61-f31c-444d-a284-b2233e5aa910",
          first_name: "Count",
          last_name: "Dooku",
          email: "dooku@ya.com",
          password:
            "$2a$10$2tnac9eDzYWlUPE8Gs7QeuFRskglSfGJ/xAeApqS.M19NAEnyhHwa",
          role: 'teacher',
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          phone_number: "666-898-1341"
        },
        {
          id: "8b4eb7b4-893c-4bb2-8bbe-b75c4223854e",
          first_name: "Luke",
          last_name: "SkyWalker",
          email: "ls@ya.com",
          password:
            "$2a$10$XqFsTM/LnALccOqBNPBwuuKlaNEDZPiOcqhIyCw3A/F3R1ut1DEHm",
          role: 'parent',
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          phone_number: "786-898-1005"
        },
        {
          id: "456a1336-1ebc-47ab-abb0-4dec6c597442",
          first_name: "Jackie",
          last_name: "Chan",
          email: "jc@ya.com",
          password:
            "$2a$10$yQC0JsO5I6OGi7xhHcSkEOyGIalG9k95X3ebFcXoxZq0pVqUowmeG",
          role: 'chaperone',
          school_id: "9a3e0d6f-1e1a-4894-ae96-5a1b512483ec",
          phone_number: "789-456-1589"
        },
        {
          id: uuid(),
          first_name: "Dude",
          last_name: "Chan",
          email: "dudewheresmycar@ya.com",
          password:
            "$2a$10$2tnac9eDzYWlUPE8Gs7QeuFRskglSfGJ/xAeApqS.M19NAEnyhHwa",
          role: 'chaperone',
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          phone_number: "456-789-4575"
        },
        {
          id: uuid(),
          first_name: "Your",
          last_name: "Mom",
          email: "yourMom@ya.com",
          password:
            "$2a$10$2tnac9eDzYWlUPE8Gs7QeuFRskglSfGJ/xAeApqS.M19NAEnyhHwa",
          role: 'chaperone',
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          phone_number: "1-800-486-7895"
        }
      ]);
    });
};
