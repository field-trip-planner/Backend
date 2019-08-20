exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.boolean("isTeacher");
    tbl
      .integer("school_id")
      .references("id")
      .inTable("schools");
    tbl.string("phone_number").unique();
  });
  await knex.schema.createTable("students", tbl => {
    tbl.increments("id");
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl
      .integer("school_id")
      .references("id")
      .inTable("schools");
    tbl
      .integer("teacher_id")
      .references("id")
      .inTable("users");
  });
  await knex.schema.createTable("schools", tbl => {
    tbl.increments("id");
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

  await knex.schema.createTable("field_trips", tbl => {
    tbl.increments("id");
    tbl.string("name").notNullable();
    tbl.date("date").notNullable();
    tbl.string("address").notNullable();
    tbl.string("supplies");
    tbl
      .integer("school_id")
      .references("id")
      .inTable("schools");
    tbl
      .integer("creator_id")
      .references("id")
      .inTable("users");
    tbl.string("cost");
    tbl.string("field_trip_details");
  });
  await knex.schema.createTable("users_field_trips", tbl => {
    tbl.increments("id");
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users");
    tbl
      .integer("field_trip_id")
      .references("id")
      .inTable("field_trips");
  });
  await knex.schema.createTable("students_field_trips", tbl => {
    tbl.increments("id");
    tbl
      .integer("student_id")
      .references("id")
      .inTable("students");
    tbl
      .integer("field_trip_id")
      .references("id")
      .inTable("field_trips");
    tbl.boolean("going_status").notNullable();
    tbl.boolean("paid_status").notNullable();
    tbl.boolean("supplies_status").notNullable();
    tbl.boolean("permission_status").notNullable();
  });
  await knex.schema.createTable("parents_students", tbl => {
    tbl.increments("id");
    tbl
      .integer("parent_id")
      .references("id")
      .inTable("users");
    tbl
      .integer("student_id")
      .references("id")
      .inTable("students");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("schools");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("field_trips");
  await knex.schema.dropTableIfExists("users_field_trips");
  await knex.schema.dropTableIfExists("students_field_trips");
  await knex.schema.dropTableIfExists("parents_students");
};
