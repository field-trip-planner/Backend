exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "Mace",
          last_name: "Windu",
          email: "takeaseat@yahoo.com",
          username: "mwindu",
          password: "mayTheForceBeWithYou",
          isTeacher: true,
          school_id: 1,
          phone_number: "666-898-1345"
        },
        {
          id: 2,
          first_name: "Luke",
          last_name: "Skywalker",
          email: "useTheForce@gmail.com",
          username: "lskywalker",
          password: "blahBlahBlah",
          isTeacher: false,
          school_id: 1,
          phone_number: "123-456-7891"
        },
        {
          id: 3,
          first_name: "Jackie",
          last_name: "Chan",
          email: "asfdaffsda@gmail.com",
          username: "jackie",
          password: "sasdfajl",
          isTeacher: true,
          school_id: 2,
          phone_number: "789-456-1589"
        }
      ]);
    });
};
