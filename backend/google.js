import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { OAuth2Client } from "google-auth-library";
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.post("/google", (req, res) => {
  console.log(res);
  const { token } = req.body;

  client
    .verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })
    .then((response) => res.send(response))
    .catch((error) => res.status(400).send(error));
});

export default app;
