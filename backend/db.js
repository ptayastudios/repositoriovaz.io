import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "user_",
  host: "localhost",
  database: "postgres",
  password: "cprc123",
  port: 5432,
});