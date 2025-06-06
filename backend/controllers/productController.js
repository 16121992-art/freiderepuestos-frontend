// backend/controllers/productController.js
import Product from "../models/productModel.js";

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand, category, stock, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      category,
      stock,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, brand, category, stock, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};