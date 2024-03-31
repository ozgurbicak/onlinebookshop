import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import googleAuthRouter from "./googleAuth.js"; // googleAuth.js modülünü import ettik
import facebookAuthRouter from "./facebookAuth.js"; // Import Facebook authentication router

dotenv.config();

const app = express();

var userProfile;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(googleAuthRouter); // googleAuth.js router'ını kullanıyoruz
app.use(facebookAuthRouter);

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
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

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

app.listen(5000, () => {
  console.log("Connected to backend!!");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  connectionDB.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Veritabanı sorgusu hatası:", err);
      return res.status(500).send({ success: false, message: "Sunucu hatası" });
    }

    if (results.length > 0) {
      if (password === results[0].password) {
        // Parolaları karşılaştırma
        res.send({ success: true, message: "Giriş başarılı" });
        console.log("başarılı");
      } else {
        res.send({ success: false, message: "Hatalı şifre" });
        console.log("hatalı şifre");
      }
    } else {
      res.send({ success: false, message: "Kullanıcı bulunamadı" });
    }
  });
});

app.post("/api/register", (req, res) => {
  const { full_name, email, password, confirmPassword } = req.body;
  console.log(req.body);

  console.log(full_name, email, password, confirmPassword);
  // Parola doğrulaması
  if (password !== confirmPassword) {
    console.log("şifreler eşleşmiyor");
    return res
      .status(400)
      .json({ success: false, message: "Parolalar eşleşmiyor" });
  } else {
    // Kullanıcıyı veritabanına ekleme işlemi
    const sql =
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    connectionDB.query(sql, [full_name, email, password], (err, results) => {
      if (err) {
        console.error("Veritabanı sorgusu hatası:", err);
        return res
          .status(500)
          .json({ success: false, message: "Kullanıcı oluşturulamadı" });
      }
      console.log("Kullanıcı oluşturuldu:", results);
      res
        .status(201)
        .json({ success: true, message: "Kullanıcı başarıyla oluşturuldu" });
    });
  }
});
