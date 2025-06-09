'use client'

import React from 'react'

type Producto = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string
  marca: string
}

interface ProductCardProps {
  producto: Producto
  onAddToCart: (producto: Producto) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={producto.imagenUrl}
        alt={producto.nombre}
        className="h-48 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold">{producto.nombre}</h2>
      <p className="text-sm text-gray-600 mb-2">{producto.descripcion}</p>
      <p className="font-semibold text-gray-800 mb-2">${producto.precio.toFixed(2)}</p>
      <p className="text-xs text-gray-500 mb-4">Marca: {producto.marca}</p>
      <button
        onClick={() => onAddToCart(producto)}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ProductCard