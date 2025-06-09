'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type ProductoCarrito = {
  _id: string
  nombre: string
  precio: number
  imagenUrl: string
  cantidad: number
}

type CarritoContextType = {
  carrito: ProductoCarrito[]
  agregarAlCarrito: (producto: ProductoCarrito) => void
  quitarDelCarrito: (id: string) => void
  limpiarCarrito: () => void
  total: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const useCarrito = (): CarritoContextType => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  return context
}

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([])

  const agregarAlCarrito = (producto: ProductoCarrito) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p._id === producto._id)
      if (existente) {
        return prev.map((p) =>
          p._id === producto._id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
        )
      }
      return [...prev, producto]
    })
  }

  const quitarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p._id !== id))
  }

  const limpiarCarrito = () => {
    setCarrito([])
  }

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, limpiarCarrito, total }}
    >
      {children}
    </CarritoContext.Provider>
  )
}