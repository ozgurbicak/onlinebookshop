import express from "express";
import { google } from "googleapis";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  client_id,
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

router.get("/google/callback", (req, res) => {
  const { code } = req.query;

  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      res.status(400).send({ error: err.message });
      return;
    }

    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });

    oauth2.userinfo.get((err, response) => {
      if (err) {
        res.status(400).send({ error: err.message });
        return;
      }

      // ... kullanıcı bilgilerini işleme al ...

      res.send({ user: response.data });
    });
  });
});

export default router;
