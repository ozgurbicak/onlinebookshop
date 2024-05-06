import express from "express";
import dotenv from "dotenv";
import connectionDB from "../db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
app.post("/api/order", (req, res) => {
  console.log(req.body);
  const {
    full_name,
    email,
    phone_number,
    address,
    city,
    total_amount,
    productData,
  } = req.body;

  const SQL = `INSERT INTO orders (ordered_at,full_name,email,phone_number,address,city,total_amount,products_data) VALUES (?,?,?,?,?,?,?,?)`;
  const values = [
    currentDate,
    full_name,
    email,
    phone_number,
    address,
    city,
    total_amount,
    JSON.stringify(productData),
  ];
  if (
    productData.length > 0 &&
    full_name &&
    email &&
    phone_number &&
    address &&
    city &&
    total_amount
  ) {
    connectionDB.query(SQL, values, (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        console.log("inserted");
        res.json({ success: true, message: "Sipariş başarıyla oluşturuldu." });
      }
    });
  }
});

export default app;
