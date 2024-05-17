import express from "express";
import dotenv from "dotenv";
import connectionDB from "../db.js";
import { splitVendorChunk } from "vite";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
app.post("/api/order", (req, res) => {
  const {
    full_name,
    email,
    phone_number,
    address,
    city,
    total_amount,
    productData,
  } = req.body;

  console.log(JSON.stringify(productData));

  const currentDate = new Date();
  const SQL = `INSERT INTO orders (ordered_at, full_name, email, phone_number, address, city, total_amount, products_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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
        console.log("Order inserted");

        // Stok güncelleme
        let updatePromises = productData.map((item) => {
          const updateSQL = `UPDATE books SET stock = stock - ? WHERE id = ?`;
          return new Promise((resolve, reject) => {
            connectionDB.query(
              updateSQL,
              [item.quantity, item.id],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          });
        });

        Promise.all(updatePromises)
          .then(() => {
            res.json({
              success: true,
              message: "Sipariş başarıyla oluşturuldu ve stok güncellendi.",
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Internal Server Error while updating stock");
          });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/orders", (req, res) => {
  connectionDB.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      res.status.apply(500).send("Internal Server Error");
    } else {
      console.log("başarılı");
      res.json({ success: true, data: result });
    }
  });
});

app.post("/api/remove/order", (req, res) => {
  console.log(req);
  const id = req.body.id;
  connectionDB.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the order." });
    }
    console.log("Order successfully deleted.");
    return res.json({
      success: true,
      message: "Order successfully removed.",
    });
  });
});
export default app;
