import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: String,
  description: String,
  expiryDate: String,
  originalName: String,
  fileUrl: String,
}, { timestamps: true });

export default mongoose.model("Document", DocumentSchema);
