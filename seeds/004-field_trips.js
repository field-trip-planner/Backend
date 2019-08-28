exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("field_trips").insert([
        {
          id: 1,
          name: "Smithsonian",
          date: "09/22/2019",
          address: "10th St. & Constitution Ave. NW, Washington, DC 20560",
          supplies: "notebook, pencil",
          school_id: 1,
          creator_id: 1,
          cost: "$1,000,000",
          field_trip_details: "HI"
        },
        {
          id: 2,
          name: "Hogwarts Shop",
          date: "10/21/2019",
          address: "Pancras Rd, Kings Cross, London N1 9AP, UK",
          supplies: "notebook, pencil, wand",
          school_id: 2,
          creator_id: 1,
          cost: "$10",
          field_trip_details: "Magic"
        },
        {
          id: 3,
          name: "Central Park Zoo",
          date: "12/14/2019",
          address: "East 64th Street, New York, NY 10021",
          supplies: "notebook, pencil, hat",
          school_id: 1,
          creator_id: 3,
          cost: "$1000",
          field_trip_details: "Hey I'm walking here!"
        }
      ]);
    });
};
