import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import connectionDB from "../db.js";
dotenv.config();

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/add", upload.single("image"), (req, res) => {
  const { name, author, description, category, price } = req.body;
  const image = req.file;

  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Şu anki tarih ve saat bilgisini alır

  const insertBookSql = `INSERT INTO books (created_at,book_name, author_name, category, summary, price, image) VALUES (?,?, ?, ?, ?, ?, ?)`;

  const values = [
    currentDate,
    name,
    author,
    category,
    description,
    price,
    `http://localhost:5000/uploads/${image.filename}`,
  ];

  console.log("image", image);
  // connectionDB.connect();

  connectionDB.query(insertBookSql, values, (err, result) => {
    if (err) {
      console.error("Veritabanına ekleme hatası:", err);
      res
        .status(500)
        .json({ success: false, message: "Veritabanına ekleme hatası" });
    } else {
      console.log("Yeni kitap eklendi:", result);
      res.json({ success: true, message: "Kitap başarıyla eklendi" });
    }
  });
});

export default app;
