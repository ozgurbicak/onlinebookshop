import express from "express";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const FACEBOOK_APP_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName"], // Request necessary fields
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/error",
    successRedirect: "/processFacebookLogin",
  })
);

router.get("/processFacebookLogin", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user._json);
    const { id } = req.user._json; // Extract Facebook ID
    const displayName = req.user.displayName;
    console.log(displayName, id);
    const query = `SELECT * FROM users WHERE facebook_id = '${id}'`;
    connectionDB.query(query, (err, results) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        const newUser = {
          facebook_id: id,
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
    res.status(401).send("Unauthorized");
  }
});

export default router;
