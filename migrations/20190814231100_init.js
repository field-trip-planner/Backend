exports.up = async function(knex) {
  await knex.schema.createTable("schools", tbl => {
    tbl.uuid("id").primary(); // adding primary() ensures id increments for Postgres
    tbl.string("school_name").notNullable();
    tbl
      .string("address")
      .notNullable()
      .unique();
    tbl.string("category").notNullable();
    tbl.string("city").notNullable();
    tbl.string("state").notNullable();
    tbl.string("zip_code").notNullable();
  });

  await knex.schema.createTable("users", tbl => {
    tbl.uuid("id").primary();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.boolean("isTeacher");
    tbl
      .uuid("school_id")
      .references("id")
      .inTable("schools");
    tbl.string("phone_number").unique();
  });
  await knex.schema.createTable("students", tbl => {
    tbl.uuid("id").primary();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl
      .uuid("school_id")
      .references("id")
      .inTable("schools");
    tbl
      .uuid("teacher_id")
      .references("id")
      .inTable("users");
  });

  await knex.schema.createTable("field_trips", tbl => {
    tbl.uuid("id").primary();
    tbl.string("name").notNullable();
    tbl.date("date").notNullable();
    tbl.string("address").notNullable();
    tbl.string("supplies");
    tbl
      .uuid("school_id")
      .references("id")
      .inTable("schools");
    tbl
      .uuid("creator_id")
      .references("id")
      .inTable("users");
    tbl.string("cost");
    tbl.string("field_trip_details");
  });
  await knex.schema.createTable("users_field_trips", tbl => {
    tbl.uuid("id").primary();
    tbl
      .uuid("user_id")
      .references("id")
      .inTable("users");
    tbl
      .uuid("field_trip_id")
      .references("id")
      .inTable("field_trips");
    tbl.boolean("isChaperone").notNullable();
  });
  await knex.schema.createTable("students_field_trips", tbl => {
    tbl.uuid("id").primary();
    tbl
      .uuid("student_id")
      .references("id")
      .inTable("students");
    tbl
      .uuid("field_trip_id")
      .references("id")
      .inTable("field_trips");
    tbl.boolean("going_status").notNullable();
    tbl.boolean("paid_status").notNullable();
    tbl.boolean("supplies_status").notNullable();
    tbl.boolean("permission_status").notNullable();
  });
  await knex.schema.createTable("parents_students", tbl => {
    tbl
      .uuid("parent_id")
      .references("id")
      .inTable("users");
    tbl
      .uuid("student_id")
      .references("id")
      .inTable("students");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("parents_students");
  await knex.schema.dropTableIfExists("students_field_trips");
  await knex.schema.dropTableIfExists("users_field_trips");
  await knex.schema.dropTableIfExists("field_trips");
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("schools");
};
