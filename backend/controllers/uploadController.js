// backend/controllers/uploadController.js
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ningún archivo" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "freiderepuestos", // carpeta en Cloudinary si usas "dynamic folders"
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Error al subir la imagen", error });
  }
};