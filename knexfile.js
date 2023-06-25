const path = require("path");

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db")
  },
  useNullAsDefault: true,

  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true,

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    }
  },


};
