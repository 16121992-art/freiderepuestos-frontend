// backend/routes/uploadRoutes.js
import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;