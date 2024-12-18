import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOSTsdsdv,
  user: process.env.DB_USERghgjgh,
  password: process.env.DB_PASSWORDfnmskdfnml,
  database: process.env.DB_NAME,
});

export default pool;
