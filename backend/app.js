import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import walletRoutes from "./src/routes/walletRoutes.js";

// Configure dotenv
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use("/api/wallet", walletRoutes);

connectDB();

export default app;