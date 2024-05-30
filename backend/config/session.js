import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const sessionConfig = session({
  resave: false,
  saveUninitialized: true,
  secret: "SECRET",
});

export default sessionConfig;
