import express from "express";
import Document from "../models/Document.js";
import authenticate from "../middlewares/authenticate.js";
import path from "path";
import fs from "fs";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Get all documents for a client
router.get("/documents", authenticate, async (req, res) => {
  const documents = await Document.find({ clientId: req.userId }).sort({ createdAt: -1 });
  res.json({ documents });
});

// View document (inline in browser)
router.get("/documents/:id/view", authenticate, async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, clientId: req.userId });
  if (!doc) return res.status(404).json({ message: "Document not found" });

  const filePath = path.join(UPLOAD_DIR, doc.fileName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing" });

  res.sendFile(filePath);
});

// Update document metadata
router.put("/documents/:id", authenticate, async (req, res) => {
  const { type, description, expiryDate } = req.body;
  const updated = await Document.findOneAndUpdate(
    { _id: req.params.id, clientId: req.userId },
    { type, description, expiryDate },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Document not found" });
  res.json(updated);
});

// Delete document
router.delete("/documents/:id", authenticate, async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, clientId: req.userId });
  if (!doc) return res.status(404).json({ message: "Not found" });

  const filePath = path.join(UPLOAD_DIR, doc.fileName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  res.json({ message: "Deleted successfully" });
});

export default router;
