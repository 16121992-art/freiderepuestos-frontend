// backend/routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // middleware para proteger rutas

const router = express.Router();

// Ruta pública para obtener todos los productos
router.get("/", getProducts);

// Ruta pública para obtener un producto por ID
router.get("/:id", getProductById);

// Rutas protegidas para admin para crear, actualizar y eliminar productos
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;