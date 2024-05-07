import express from "express";
import dotenv from "dotenv";
import connectionDB from "../db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

app.post("/api/order", (req, res) => {
  console.log(req);
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

{
  /* <td>
                {JSON.parse(order.products_data)
                  .map((product) => product.book_name)
                  .join(", ")}
              </td> */
}
