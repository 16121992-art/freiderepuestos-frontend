// backend/routes/upload.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authMiddleware = require('../middleware/authMiddleware');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de almacenamiento con multer y Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'freiderepuestos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  },
});

const upload = multer({ storage });

// Ruta protegida para subir imagen
router.post('/', authMiddleware, upload.single('imagen'), (req, res) => {
  try {
    const imagenUrl = req.file.path;
    res.json({ url: imagenUrl });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ mensaje: 'Error al subir la imagen' });
  }
});

module.exports = router;
