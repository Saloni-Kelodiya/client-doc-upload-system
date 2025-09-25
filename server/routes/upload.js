import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Document from "../models/Document.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();
const uploadPath = path.join(process.cwd(), "uploads");

// Create uploads folder if not exists
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
 

// POST /api/upload
router.post("/", authenticate, upload.single("document"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { type, description, expiryDate } = req.body;
  const clientId = req.userId;
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  try {
    const newDoc = new Document({
      clientId,
      type,
      description,
      expiryDate,
      fileName: req.file.filename,  // ✅ Save filename
      fileUrl: fullUrl,             // ✅ Save full URL
      originalName: req.file.originalname,
    });

    await newDoc.save();
    res.status(200).json({ message: "File uploaded", document: newDoc });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
