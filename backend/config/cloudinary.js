// backend/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  // Se configura automáticamente desde CLOUDINARY_URL
  secure: true,
});

export default cloudinary;