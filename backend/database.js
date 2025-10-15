/*import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "user_",
  host: "localhost",
  database: "postgres",
  password: "cprc123",
  port: 5432,
});*/


import postgres from "postgres";
const sql = postgres("postgres://user_:cprc123@localhost:5432/postgres");

export default sql;