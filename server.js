import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import { adminAuth, userAuth } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/admin", adminAuth, (req, res) => {
  res.send();
});
app.get("/user", userAuth, (req, res) => {
  res.send();
});

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", eventRoutes);

connectDB();

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
