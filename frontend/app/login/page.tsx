// frontend/app/login/page.tsx

'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      // Guarda token en localStorage
      localStorage.setItem('token', data.token)
      // Redirige al panel admin
      router.push('/admin')
    } catch (err: any) {
      if (err.response?.data?.message) setError(err.response.data.message)
      else setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-6 font-semibold text-center">Iniciar Sesión</h1>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        <label className="block mb-2 font-medium" htmlFor="email">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginPage