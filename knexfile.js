const pgConnection =
  process.env.DATABASE_URL || "postgresql://postgres@localhost/songs";
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./db/songs.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        // this is in case you use a foreign keys in your tables
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
