'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [carritoCount, setCarritoCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const items = localStorage.getItem('carrito')
    if (items) {
      const parsed = JSON.parse(items)
      const total = parsed.reduce((sum: number, item: any) => sum + item.cantidad, 0)
      setCarritoCount(total)
    }
  }, [pathname]) // Se actualiza cada vez que cambia la ruta

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300">
          FreideRepuestos
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Catálogo
          </Link>
          <Link href="/carrito" className="hover:text-gray-300">
            Carrito ({carritoCount})
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar