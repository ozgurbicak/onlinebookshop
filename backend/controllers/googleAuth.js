import express from "express";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const router = express.Router();

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"], // Frontend ve backend adresleri
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

router.use(cors(corsOptions));

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

let successfulLogins = [];

const addSuccessfulLogin = (profile) => {
  successfulLogins = [profile];
};
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      addSuccessfulLogin(profile);
      return done(null, profile);
    }
  )
);

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/processGoogleLogin",
  })
);

router.get("/processGoogleLogin", cors(corsOptions), (req, res) => {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    const { email } = req.user._json;
    const displayName = req.user.displayName;
    const { picture } = req.user._json;
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
          picture: picture,
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
              .status(200)
              .json({ message: "Login successful", user: req.user._json });
          }
        );
      } else {
        return res
          .status(200)
          .json({ message: "Login successful", user: req.user._json });
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.get("/successful-logins", cors(corsOptions), (req, res) => {
  console.log(successfulLogins);
  res.status(200).json(successfulLogins);
});
console.log(successfulLogins);

export default router;
