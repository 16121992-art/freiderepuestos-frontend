'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Producto = {
  id: string
  nombre: string
  precio: number
  cantidad: number
}

const CheckoutPage = () => {
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem('carrito')
    if (storedCart) {
      setCarrito(JSON.parse(storedCart))
    }
  }, [])

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:5000/api/crear-checkout', {
        productos: carrito,
      })

      if (res.data?.url) {
        window.location.href = res.data.url // redirige a Stripe Checkout
      } else {
        throw new Error('No se recibió URL de Stripe')
      }
    } catch (error) {
      console.error('Error al procesar el pago', error)
      alert('Hubo un error al procesar el pago.')
    } finally {
      setLoading(false)
    }
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map((item) => (
            <div key={item.id} className="flex justify-between bg-white p-4 rounded shadow">
              <div>
                <h2 className="font-semibold">{item.nombre}</h2>
                <p>Cantidad: {item.cantidad}</p>
              </div>
              <p>${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Procesando...' : 'Pagar con Stripe'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage