exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .string("username")
      .notNullable()
      .unique();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
};
