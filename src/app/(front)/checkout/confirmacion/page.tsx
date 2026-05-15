'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowLeft, Package, MapPin, Phone, User, Home, Building2, Loader, ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'

type ShippingItem = {
  productId: string
  name: string
  price: number
  discount?: number
  image?: string
  quantity: number
}

type ShippingData = {
  nombreCompleto: string
  direccion: string
  ciudad: string
  whatsapp: string
  barrio: string
  items: ShippingItem[]
  subtotal: number
  discount: number
  total: number
}

export default function ConfirmacionPage() {
  const { status } = useSession()
  const router = useRouter()
  const [shipping, setShipping] = useState<ShippingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    if (status === 'loading') return

    const fetchShipping = async () => {
      try {
        const res = await fetch('/api/shipping')
        if (res.ok) {
          const data = await res.json()
          if (data.items?.length > 0) {
            setShipping(data)
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }

    fetchShipping()
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!shipping) {
    return (
      <div className="min-h-screen bg-black">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>

        <div className="relative max-w-lg mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No hay pedidos</h2>
          <p className="text-gray-400 mb-8">Aún no has realizado ningún pedido</p>
          <Link
            href="/productos"
            className="inline-block px-8 py-3 rounded-xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-500 hover:shadow-lg transition-all duration-300"
          >
            Ver productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 py-12">      

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">Pedido confirmado</h1>
            <p className="text-gray-400 mt-1">Tu pedido ha sido registrado exitosamente</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                Datos de envío
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Nombre</p>
                    <p className="text-white font-medium">{shipping.nombreCompleto}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">WhatsApp</p>
                    <p className="text-white font-medium">{shipping.whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Dirección</p>
                    <p className="text-white font-medium">{shipping.direccion}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Ciudad</p>
                    <p className="text-white font-medium">{shipping.ciudad}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Barrio</p>
                    <p className="text-white font-medium">{shipping.barrio}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-400" />
                Productos pedidos
              </h3>
              <div className="space-y-3">
                {shipping.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-3 rounded-xl bg-green-500/5 border border-green-500/10"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">Cant: {item.quantity}</span>
                        <span className="text-gray-500">·</span>
                        {item.discount && item.discount > 0 ? (
                          <>
                            <span className="text-sm text-green-400 font-bold">{formatPrice(item.discount)}</span>
                            <span className="text-xs text-gray-500 line-through">{formatPrice(item.price)}</span>
                          </>
                        ) : (
                          <span className="text-sm text-green-400 font-bold">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        {formatPrice((item.discount ?? item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(shipping.subtotal)}</span>
                </div>
                {shipping.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento</span>
                    <span>-{formatPrice(shipping.discount)}</span>
                  </div>
                )}
                <div className="border-t border-green-500/20 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-green-400">{formatPrice(shipping.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
