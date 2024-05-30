import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const corsConfig = cors(corsOptions);

export default corsConfig;
