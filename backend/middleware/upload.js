import multer from "multer";

// Configure Multer for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
