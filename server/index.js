import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import authRoute from "./routes/authRoutes.js";
import uploadRoute from "./routes/upload.js";
import documentRoute from "./routes/document.js";

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 

// Register routes
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", documentRoute);

mongoose
  mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
