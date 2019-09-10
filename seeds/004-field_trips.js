exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("field_trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("field_trips").insert([
        {
          id: "790cb09f-a2e9-420f-a3ac-9d35bdb72118",
          name: "Smithsonian",
          date: "2019-09-22T04:00:00.000Z",
          address: "10th St. & Constitution Ave. NW, Washington, DC 20560",
          supplies: "notebook, pencil",
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          creator_id: "59495f61-f31c-444d-a284-b2233e5aa914",
          cost: "$1,000,000",
          field_trip_details: "HI"
        },
        {
          id: "e50771b5-ec74-440f-addc-ea6c0beb0f77",
          name: "Hogwarts Shop",
          date: "2019-10-21T04:00:00.000Z",
          address: "Pancras Rd, Kings Cross, London N1 9AP, UK",
          supplies: "notebook, pencil, wand",
          school_id: "4187269f-d1fa-41fe-ad34-2e7d74a9031a",
          creator_id: "59495f61-f31c-444d-a284-b2233e5aa914",
          cost: "$10",
          field_trip_details: "Magic"
        },
        {
          id: "3e299fd8-0edd-42a4-999c-cbf57380b06b",
          name: "Central Park Zoo",
          date: "2019-12-14T05:00:00.000Z",
          address: "East 64th Street, New York, NY 10021",
          supplies: "notebook, pencil, hat",
          school_id: "9a3e0d6f-1e1a-4894-ae96-5a1b512483ec",
          creator_id: "456a1336-1ebc-47ab-abb0-4dec6c597442",
          cost: "$1000",
          field_trip_details: "Hey I'm walking here!"
        }
      ]);
    });
};
