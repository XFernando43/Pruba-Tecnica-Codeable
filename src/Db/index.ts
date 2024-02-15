import { Client, Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  host: process.env["DB_HOST"],
  port: Number(process.env["DBPORT"]),
  database: process.env["DATABASE"],
  user: process.env["USER"],
  password: process.env["PASSWORD"],
});

export const query = async (
  text: string,
  params?: (string | number | boolean)[]
  ) => {
    const results = await pool.query(text, params);
    return results;
  };
  
  export const adminClient = new Client({
    host: process.env["DB_HOST"],
    port: Number(process.env["DBPORT"]),
    database: process.env["ADMINDATABASE"],
    user: process.env["USER"],
    password: process.env["PASSWORD"]
});
