import cloudinary from "../config/cloudinary.js";
import Notice from "../models/Notice.js";

// ✅ Upload PDF to Cloudinary
export const uploadNotice = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "pdf_uploads" },
      async (error, cloudinaryResult) => {
        if (error) return res.status(500).json({ error: error.message });

        const newNotice = new Notice({
          title: req.file.originalname,
          pdfUrl: cloudinaryResult.secure_url
        });

        await newNotice.save();
        res.status(201).json(newNotice);
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All PDFs
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete pdf
export const deleteNotice = async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id);
      if (!notice) return res.status(404).json({ message: "Notice not found" });
  
      // Extract public ID from Cloudinary URL
      const publicId = notice.pdfUrl.split("/").pop().split(".")[0];
  
      // Remove from Cloudinary
      await cloudinary.uploader.destroy(`pdf_uploads/${publicId}`, { resource_type: "raw" });
  
      // Remove from Database
      await Notice.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Notice deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };