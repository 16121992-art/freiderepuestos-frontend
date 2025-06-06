// backend/models/orderModel.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pendiente", "En preparación", "Enviado", "Entregado"],
    default: "Pendiente",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;