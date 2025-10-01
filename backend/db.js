require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432), // <- Postgres em 3101
  database: process.env.PGDATABASE || "loja",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD,
});

module.exports = { pool };
