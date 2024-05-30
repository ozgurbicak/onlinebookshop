import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import connectionDB from "../config/db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/remove/book", (req, res) => {
  const id = req.body.id;

  connectionDB.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the book." });
    }
    console.log("Book successfully deleted.");
    return res.json({ success: true, message: "Book successfully removed." });
  });
});

app.post("/api/edit/book", (req, res) => {
  const { id, book_name, author_name, category, price, stock } = req.body;

  const query = `
    UPDATE books 
    SET book_name = ?, author_name = ?, category = ?, price = ?, stock = ? 
    WHERE id = ?
  `;
  const values = [book_name, author_name, category, price, stock, id];

  connectionDB.query(query, values, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the book." });
    }
    console.log("Book successfully updated.");
    return res.json({ success: true, message: "Book successfully updated." });
  });
});

app.post("/api/remove/user", (req, res) => {
  const id = req.body.id;
  console.log(id);
  connectionDB.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
    console.log("User successfully deleted.");
    return res.json({
      success: true,
      message: "User successfully removed.",
    });
  });
});

app.post("/api/edit/user", (req, res) => {
  const { id, email, full_name, phone_number } = req.body;

  const query = `
    UPDATE users 
    SET email = ?, full_name = ?, phone_number = ?
    WHERE id = ?
  `;
  const values = [email, full_name, phone_number, id];

  connectionDB.query(query, values, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
    console.log("User successfully updated.");
    return res.json({ success: true, message: "User successfully updated." });
  });
});

export default app;
