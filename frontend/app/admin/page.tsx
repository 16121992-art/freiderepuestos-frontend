'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AdminPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Verificar token con backend o decodificar (simple ejemplo sin decodificación JWT)
    axios
      .get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) return <div className="p-8 text-center">Cargando...</div>

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <p className="mb-4">Bienvenido, {user?.email}</p>

      {/* Aquí irán más componentes y funcionalidades del panel admin */}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default AdminPage