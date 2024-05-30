import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import googleAuthRouter from "./controllers/googleAuth.js";
import facebookAuthRouter from "./controllers/facebookAuth.js";
import addRouter from "./admin/add.js";
import listRouter from "./admin/list.js";
import orderRouter from "./admin/order.js";
import cors from "./config/cors.js";
import sessionConfig from "./config/session.js";
import { login, register } from "./controllers/authController.js";
import { getBooks, getUsers } from "./controllers/controllers.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use(sessionConfig);
app.use(bodyParser.json());

app.post("/api/login", login);
app.post("/api/register", register);

app.use(googleAuthRouter);
app.use(facebookAuthRouter);
app.use(addRouter);
app.use(listRouter);
app.use(orderRouter);

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/api/books", getBooks);
app.get("/api/users", getUsers);

app.get("/error", (req, res) => res.send("error logging in"));

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Connected to backend!!");
});
