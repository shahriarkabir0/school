import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  title: String,
  pdfUrl: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notice", NoticeSchema);
