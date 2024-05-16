import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import connectionDB from "../db.js";
dotenv.config();

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/addbook", upload.single("image"), (req, res) => {
  const { name, author, description, category, price, stock } = req.body;
  const image = req.file;

  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Current date and time

  const insertBookSql = `INSERT INTO books (created_at,book_name, author_name, category, summary, price,stock, image) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    currentDate,
    name,
    author,
    category,
    description,
    price,
    stock,
    image ? `http://localhost:5000/uploads/${image.filename}` : null,
  ];

  connectionDB.query(insertBookSql, values, (err, result) => {
    if (err) {
      console.error("Database insertion error:", err);
      res
        .status(500)
        .json({ success: false, message: "Database insertion error" });
    } else {
      console.log("New book added:", result);
      res.json({ success: true, message: "Book added successfully" });
    }
  });
});

app.post("/api/adduser", upload.single("picture"), (req, res) => {
  const { full_name, email, phone_number, address, password } = req.body;
  const picture = req.file;

  const checkUserSql = `SELECT * FROM users WHERE email = ?`;

  connectionDB.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      if (result.length > 0) {
        // If the email address is already in use, send an error
        res.status(400).json({
          success: false,
          message: "This email address is already in use",
        });
      } else {
        // If the email address is not in use, add the new user
        const insertUserSql = `INSERT INTO users (created_at,full_name, email, phone_number, address, password, picture) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const currentDate = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        const values = [
          currentDate,
          full_name,
          email,
          phone_number,
          address,
          password,
          picture ? `http://localhost:5000/uploads/${picture.filename}` : null,
        ];

        connectionDB.query(insertUserSql, values, (err, result) => {
          if (err) {
            console.error("Database insertion error:", err);
            res
              .status(500)
              .json({ success: false, message: "Database insertion error" });
          } else {
            console.log("New user added:", result);
            res.json({ success: true, message: "User added successfully" });
          }
        });
      }
    }
  });
});

export default app;
