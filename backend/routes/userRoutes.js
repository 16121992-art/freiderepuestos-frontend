/ backend/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registro de usuario
router.post("/register", registerUser);

// Login de usuario
router.post("/login", authUser);

// Obtener perfil del usuario (protegido)
router.get("/profile", protect, getUserProfile);

export default router;