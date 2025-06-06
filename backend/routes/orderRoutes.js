// backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Crear nuevo pedido (usuario autenticado)
router.post("/", protect, createOrder);

// Obtener pedido por ID (usuario autenticado, solo puede ver sus pedidos o admin)
router.get("/:id", protect, getOrderById);

// Obtener todos los pedidos (solo admin)
router.get("/", protect, admin, getOrders);

// Actualizar estado del pedido (solo admin)
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;