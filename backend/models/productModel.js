/ backend/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
    },
    brand: {
      type: String,
      required: [true, "La marca es obligatoria"],
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;