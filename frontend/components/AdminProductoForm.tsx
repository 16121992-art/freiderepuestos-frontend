'use client'

import React, { useState } from 'react'
import axios from 'axios'

interface ProductoFormProps {
  onSuccess: () => void
}

const marcasDisponibles = ['Chevrolet', 'Jeep', 'Ford', 'Dodge']

const AdminProductoForm: React.FC<ProductoFormProps> = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState(0)
  const [marca, setMarca] = useState(marcasDisponibles[0])
  const [imagen, setImagen] = useState<File | null>(null)
  const [cargando, setCargando] = useState(false)

  const handleImagenUpload = async (): Promise<string | null> => {
    if (!imagen) return null
    const formData = new FormData()
    formData.append('file', imagen)
    formData.append('upload_preset', 'freiderepuestos') // Cloudinary preset

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/<tu-cloud-name>/image/upload',
      formData
    )
    return res.data.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      const imagenUrl = await handleImagenUpload()

      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        marca,
        imagenUrl
      }

      await axios.post('http://localhost:4000/api/productos', nuevoProducto)
      alert('Producto creado correctamente')
      setNombre('')
      setDescripcion('')
      setPrecio(0)
      setMarca(marcasDisponibles[0])
      setImagen(null)
      onSuccess()
    } catch (err) {
      console.error('Error al crear producto', err)
      alert('Error al crear producto')
    } finally {
      setCargando(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(parseFloat(e.target.value))}
        required
        className="w-full p-2 border rounded"
      />

      <select
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {marcasDisponibles.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={cargando}
      >
        {cargando ? 'Guardando...' : 'Guardar Producto'}
      </button>
    </form>
  )
}

export default AdminProductoForm