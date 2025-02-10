import express from "express";
import upload from "../middleware/upload.js";
import { uploadNotice, getAllNotices,deleteNotice } from "../controllers/noticeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload",protect, upload.single("pdf"), uploadNotice);
router.get("/", getAllNotices);
router.delete("/:id",protect, deleteNotice);

export default router;
