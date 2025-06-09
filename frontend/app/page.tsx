'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Producto {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  marca: string
  imagenUrl: string
}

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [marca, setMarca] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos`, {
        params: {
          marca: marca || undefined,
          q: busqueda || undefined,
        },
      })
      setProductos(res.data)
    } catch (error) {
      console.error('Error al obtener productos', error)
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [marca, busqueda])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Repuestos</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Todas las marcas</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Jeep">Jeep</option>
          <option value="Ford">Ford</option>
          <option value="Dodge">Dodge</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border px-4 py-2 rounded-md flex-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto._id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{producto.nombre}</h2>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-blue-600 font-bold mt-1">${producto.precio.toFixed(2)}</p>
            <span className="text-sm text-gray-500">Marca: {producto.marca}</span>
          </div>
        ))}
      </div>
    </main>
  )
}