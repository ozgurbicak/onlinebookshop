import express from "express";
import { google } from "googleapis";

const router = express.Router();

const clientId =
  "1051985378257-tt7u9vuoltfdnd2tf5tct1c7p6cmc02m.apps.googleusercontent.com";
const clientSecret = "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";
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  "http://localhost:5000/auth/google/callback",
  [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ]
);

router.get("/google-auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.send({ url });
});

router.post("/google-auth/callback", (req, res) => {
  const { code } = req.body;

  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }

    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2("v2");

    oauth2.userinfo.get(
      {
        access_token: tokens.access_token,
      },
      (err, user) => {
        if (err) {
          res.status(400).send({ error: err.message });
          return;
        }

        // ... işleme al kullanıcı bilgilerini ...

        res.send({ user: user.data });
      }
    );
  });
});

export default router; // router nesnesini default olarak export edin
