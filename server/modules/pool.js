const pg = require("pg");

let databaseName = "weekend-to-do-app";

if (process.env.NODE_ENV === "test") {
  databaseName = "prime_testing";
}

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL_URL + "?sslmode=require",
});

module.exports = pool;
