import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import { adminAuth, userAuth } from "./middlewares/auth.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

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
