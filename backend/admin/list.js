import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import connectionDB from "../db.js";
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

export default app;
