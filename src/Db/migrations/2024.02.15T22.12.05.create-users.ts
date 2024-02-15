import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      age INTEGER,
      role VARCHAR(10) CHECK (role IN ('admin', 'user')),
      password VARCHAR(100)
    );
  `);
};
export const down: Migration = async (params) => {
  params.context.query(`RAISE EXCEPTION 'down migration not implemented'`);
};
