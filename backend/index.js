import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Use cors middleware

const connectionDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Random_112262",
  database: "storytime-bookshop",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/api/books", (req, res) => {
  connectionDB.query("SELECT * FROM books", (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(5000, () => {
  console.log("Connected to backend!!");
});
