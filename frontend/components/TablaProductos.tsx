'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Producto = {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string
  marca: string
}

const TablaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)

  const obtenerProductos = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/productos')
      setProductos(res.data)
    } catch (err) {
      console.error('Error al cargar productos', err)
    } finally {
      setCargando(false)
    }
  }

  const eliminarProducto = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return

    try {
      await axios.delete(`http://localhost:4000/api/productos/${id}`)
      setProductos(productos.filter((producto) => producto._id !== id))
    } catch (err) {
      console.error('Error al eliminar producto', err)
      alert('No se pudo eliminar el producto.')
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  if (cargando) return <p className="text-center">Cargando productos...</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Imagen</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Marca</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id} className="border-t">
              <td className="p-2">
                <img src={producto.imagenUrl} alt={producto.nombre} className="h-12 w-12 object-cover" />
              </td>
              <td className="p-2">{producto.nombre}</td>
              <td className="p-2">{producto.marca}</td>
              <td className="p-2">${producto.precio.toFixed(2)}</td>
              <td className="p-2">
                {/* Botón de editar futuro aquí */}
                <button
                  onClick={() => eliminarProducto(producto._id)}
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaProductos