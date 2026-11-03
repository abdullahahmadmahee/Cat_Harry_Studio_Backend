import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db";
import authRoutes from "../src/routes/authRoutes";
import studioRoutes from "../src/routes/studioRoutes";
import bookingRoutes from "../src/routes/bookingRoutes";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect to DB inside the serverless function handler
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/studios", studioRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("StudioSpace API is running on Vercel Serverless");
});

export default app;