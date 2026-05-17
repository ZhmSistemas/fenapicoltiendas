'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import { useCart } from '@/context/CartContext'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const { cartOpen, setCartOpen } = useCart()
  
  // Ocultar Navbar en rutas que empiecen con /dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null
  }
  
  return (
    <>
      <Navbar />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
