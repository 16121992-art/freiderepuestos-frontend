// backend/models/Producto.js

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  marca: {
    type: String,
    required: true,
    enum: ['Chevrolet', 'Jeep', 'Ford', 'Dodge'],
  },
  imagenUrl: {
    type: String,
    required: true,
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Producto', productoSchema);