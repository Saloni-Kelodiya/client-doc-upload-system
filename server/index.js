import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/authRoutes.js";
import uploadRoute from "./routes/upload.js";
import documentRoute from "./routes/document.js";

dotenv.config();

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", documentRoute);

// // ✅ Serve React build
// const clientPath = path.join(__dirname, "client", "dist");
// app.use(express.static(clientPath));

// // For any other route, serve index.html
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(clientPath, "index.html"));
// });


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
