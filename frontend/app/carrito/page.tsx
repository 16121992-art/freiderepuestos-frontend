'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Producto = {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidad: number
}

const CarritoPage = () => {
  const [carrito, setCarrito] = useState<Producto[]>([])
  const router = useRouter()

  useEffect(() => {
    const items = localStorage.getItem('carrito')
    if (items) {
      setCarrito(JSON.parse(items))
    }
  }, [])

  const actualizarCarrito = (items: Producto[]) => {
    setCarrito(items)
    localStorage.setItem('carrito', JSON.stringify(items))
  }

  const eliminarProducto = (id: string) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id)
    actualizarCarrito(nuevoCarrito)
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const irACheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map((producto) => (
            <div
              key={producto.id}
              className="flex items-center justify-between bg-white p-4 shadow rounded"
            >
              <div className="flex items-center gap-4">
                <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover" />
                <div>
                  <h2 className="font-semibold">{producto.nombre}</h2>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p className="text-sm text-gray-600">${producto.precio} c/u</p>
                </div>
              </div>
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={irACheckout}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Ir al Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarritoPage