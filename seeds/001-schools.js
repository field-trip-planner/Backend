exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("schools")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("schools").insert([
        {
          id: 1,
          school_name: "River East Elementary School",
          address: "1st Avenue",
          category: "Elementary",
          city: "New York",
          state: "NY",
          zip_code: "10035"
        },
        {
          id: 2,
          school_name: "",
          address: "",
          category: "",
          city: "",
          state: "",
          zip_code: ""
        }
      ]);
    });
};
