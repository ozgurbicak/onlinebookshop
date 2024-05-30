import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connectionDB.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully.");
  }
});
export default connectionDB;
