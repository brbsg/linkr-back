import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default connection;
