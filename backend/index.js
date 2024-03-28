import passport from "passport";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();
var userProfile;

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

app.listen(5000, () => {
  console.log("Connected to backend!!");
});

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/processGoogleLogin",
  })
);

app.get("/processGoogleLogin", (req, res) => {
  if (userProfile) {
    const { email } = userProfile._json;
    const displayName = userProfile.displayName;

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    connectionDB.query(query, (err, results) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        const newUser = {
          email: email,
          full_name: displayName,
          password: "",
        };
        connectionDB.query(
          "INSERT INTO users SET ?",
          newUser,
          (insertErr, insertResult) => {
            if (insertErr) {
              console.log(insertErr);
              return res.status(500).send({ error: "Error creating new user" });
            }
            return res
              .status(201)
              .send({ message: "New user created successfully" });
          }
        );
      } else {
        return res.status(200).send({ message: "Login successful" });
      }
    });
  } else {
    res.status(500).send("User profile not found");
  }
});

// app.post("/api/login", (req, res) => {
//   const { email } = req.body;
//   const displayName = req.body.displayName;

//   console.log(email, displayName);
//   const query = `SELECT * FROM users WHERE email = '${email}'`;
//   connectionDB.query(query, (err, results) => {
//     if (err) {
//       console.error("Query error:", err);
//       return res.status(500).send({ error: "Internal Server Error" });
//     }

//     if (results.length === 0) {
//       const newUser = {
//         email: email,
//         full_name: displayName,
//       };

//       console.log(newUser);

//       connectionDB.query(
//         "INSERT INTO users SET ?",
//         newUser,
//         (insertErr, insertResult) => {
//           if (insertErr) {
//             console.error("Insert error:", insertErr);
//             return res.status(500).send({ error: "Error creating new user" });
//           }
//           console.log("Insert result:", insertResult);
//           return res
//             .status(201)
//             .send({ message: "New user created successfully" });
//         }
//       );
//     } else {
//       const userId = results[0].id;
//       req.session.userId = userId;
//       return res.status(200).send({ message: "Login successful" });
//     }
//   });
// });
