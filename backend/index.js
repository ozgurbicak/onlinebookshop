import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import googleAuthRouter from "./googleAuth.js";
import facebookAuthRouter from "./facebookAuth.js";
import addRouter from "./admin/add.js";
import listRouter from "./admin/list.js";
import orderRouter from "./admin/order.js";
import connectionDB from "./db.js";
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
  origin: ["http://localhost:3000", "http://localhost:4000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(googleAuthRouter);
app.use(facebookAuthRouter);
app.use(addRouter);
app.use(listRouter);
app.use(orderRouter);

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/api/books", (req, res) => {
  connectionDB.query("SELECT * FROM books", (err, data) => {
    if (err) {
      console.error("Sorgu hatası:", err);
      return res
        .status(500)
        .json({ error: "Veri çekme sırasında bir hata oluştu." });
    }
    return res.json({ success: true, data: data });
  });
});

app.get("/api/users", (req, res) => {
  connectionDB.query("SELECT * FROM users", (err, data) => {
    if (err) {
      console.error("Sorgu hatası:", err);
      return res
        .status(500)
        .json({ error: "Veri çekme sırasında bir hata oluştu." });
    }
    return res.json({ success: true, data: data });
  });
});

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Connected to backend!!");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  connectionDB.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Veritabanı sorgusu hatası:", err);
      return res
        .status(500)
        .send({ success: false, message: "veritabanı sorgu hatası" });
    }

    if (results.length > 0) {
      if (password === results[0].password) {
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
  const { full_name, email, phone_number, password, confirmPassword } =
    req.body;

  // Parola doğrulaması
  if (password !== confirmPassword) {
    console.log("şifreler eşleşmiyor");
    return res
      .status(400)
      .json({ success: false, message: "Parolalar eşleşmiyor" });
  } else {
    // Kullanıcıyı veritabanında kontrol etme
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    connectionDB.query(
      checkUserSql,
      [email],
      (checkUserErr, checkUserResults) => {
        if (checkUserErr) {
          console.error("Veritabanı sorgusu hatası:", checkUserErr);
          return res
            .status(500)
            .json({ success: false, message: "Kullanıcı oluşturulamadı" });
        }

        // check email
        if (checkUserResults.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Bu e-posta adresi zaten kullanımda",
          });
        } else {
          const insertUserSql =
            "INSERT INTO users (full_name,email,phone_number, password) VALUES (?, ?, ?,?)";
          connectionDB.query(
            insertUserSql,
            [full_name, email, phone_number, password],
            (insertUserErr, insertUserResults) => {
              if (insertUserErr) {
                console.error("Veritabanı sorgusu hatası:", insertUserErr);
                return res.status(500).json({
                  success: false,
                  message: "Kullanıcı oluşturulamadı",
                });
              }
              console.log("Kullanıcı oluşturuldu:", insertUserResults);
              res.status(201).json({
                success: true,
                message: "Kullanıcı başarıyla oluşturuldu",
              });
            }
          );
        }
      }
    );
  }
});
