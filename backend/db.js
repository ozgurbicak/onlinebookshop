import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

export default connectionDB;
