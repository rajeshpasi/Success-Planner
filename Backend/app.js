// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// 🛣️ Routes
import authRoutes from "./routes/auth.route.js";

// 🛑 Error Middleware
import { errorHandler } from "./middlewares/error.middleware.js";

// 📦 Load .env config
dotenv.config();

// ⚙️ Create express app
const app = express();

// 🌐 CORS setup (Allow frontend to connect)
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// 🔧 Middlewares
app.use(express.json());            // Parse JSON body
app.use(cookieParser());            // Read/write cookies
app.use(morgan("dev"));             // Log incoming requests

// 🛣️ API Routes
app.use("/api/auth", authRoutes);

// ❌ Global Error Handler (last middleware)
app.use(errorHandler);

// 🚀 Export app to use in server.js
export default app;
