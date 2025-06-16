import express from "express";
import Document from "../models/Document.js";
import authenticate from "../middlewares/authenticate.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

router.get("/documents", authenticate, async (req, res) => {
  try {
    const documents = await Document.find({ clientId: req.userId }).sort({ createdAt: -1 });
    res.json({ documents });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

router.get("/documents/:id/view", authenticate, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, clientId: req.userId });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.sendFile(path.join(UPLOAD_DIR, path.basename(doc.fileUrl)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error viewing document" });
  }
});

router.put("/documents/:id", authenticate, async (req, res) => {
  try {
    const { type, description, expiryDate } = req.body;
    const updated = await Document.findOneAndUpdate(
      { _id: req.params.id, clientId: req.userId },
      { type, description, expiryDate },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating document" });
  }
});

router.delete("/documents/:id", authenticate, async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, clientId: req.userId });
    if (!doc) return res.status(404).json({ message: "Not found" });

    fs.unlink(path.join(UPLOAD_DIR, path.basename(doc.fileUrl)), () => {});
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting document" });
  }
});

export default router;
