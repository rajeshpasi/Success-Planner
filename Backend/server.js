// server.js
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";               // Express app setup (routes, middleware)
import connectDB from "./config/db.js";   // MongoDB connection

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🔗 First connect to database
connectDB().then(() => {
  // 🔧 Create HTTP server using Express app
  const server = http.createServer(app);

  // 🚀 Start server
  server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });

  // 🔴 Optional: Handle server-level errors
  server.on("error", (err) => {
    console.error("❌ Server error:", err.message);
  });
});
