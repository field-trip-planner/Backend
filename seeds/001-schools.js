exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("schools")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("schools").insert([
        {
          id: "9a3e0d6f-1e1a-4894-ae96-5a1b512483ec",
          school_name: "River East Elementary School",
          address: "1st Avenue",
          category: "Elementary",
          city: "New York",
          state: "NY",
          zip_code: "10035"
        },
        {
          id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          school_name: "Monatiquot School Kindergarten Center",
          address: "25 Brow Ave",
          category: "Elementary",
          city: "Braintree",
          state: "MA",
          zip_code: "02184"
        }
      ]);
    });
};
