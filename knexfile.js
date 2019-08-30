// Update with your config settings.
const keys = require('./authenticationConfig/keys');

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    }
  },

  /* For your Local environment */

  staging: {
    client: "postgresql",
    connection: {
      database: 'fieldtrip',
      user: 'postgres',
      password: keys.postgressql.dbpassword,
      // password: 'labsweek'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

/* Heroku Staging */

  // staging: {
  //   client: "postgresql",
  //   connection: process.env.DATABASE_URL,
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
