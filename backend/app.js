import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/payments", paymentRoutes);

// Middleware de errores
app.use(notFound);
app.use(errorHandler);

// Conexión a MongoDB y servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });