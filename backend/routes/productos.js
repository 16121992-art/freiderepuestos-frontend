// backend/routes/productos.js

const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const { marca, q } = req.query;

    const filtro = {};
    if (marca) filtro.marca = marca;
    if (q) filtro.nombre = { $regex: q, $options: 'i' };

    const productos = await Producto.find(filtro).sort({ creadoEn: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// Crear un nuevo producto (privado)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear producto', error });
  }
});

// Editar un producto (privado)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error });
  }
});

// Eliminar un producto (privado)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar producto', error });
  }
});

module.exports = router;
