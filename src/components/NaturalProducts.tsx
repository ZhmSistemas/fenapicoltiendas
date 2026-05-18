'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import {
  Leaf,
  ChevronRight,
  ShieldCheck,
  Truck,
  Star,
  ShoppingCart,
  Sparkles,
  Zap,
  Timer,
  Tag,
  Package,
} from 'lucide-react'
import { Product } from '@/lib/models/ProductModel'
import { formatPrice } from '@/lib/formatPrice'
import { useCart } from '@/context/CartContext'
import { showToast } from 'nextjs-toast-notify'

export default function NaturalProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?home=true')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch {
        console.error('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        </div>

        <div className="relative px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            onLoadedMetadata={() => { if (videoRef.current) videoRef.current.playbackRate = 0.4 }}
          >
            <source src="https://res.cloudinary.com/dwzhibduy/video/upload/v1779074818/result-1779074736207_ugddil.mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 z-[1]" />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-800/70 border border-green-500 mb-8">
              <Leaf className="w-4 h-4 text-green-300" />
              <span className="text-sm font-semibold text-green-200">Productos 100% Naturales</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-green-300 via-emerald-300 to-teal-300">
                Fenapicol Tiendas
              </span>
              <br />
              <span className="text-white">Naturaleza Pura</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-12">
              Descubre nuestra línea de productos naturales seleccionados para tu bienestar integral
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 mb-12">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-300" />
                <span>Calidad Certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-300" />
                <span>Envío en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span>4.9 Estrellas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discounted Products Section */}
      <div className="relative py-24 px-6 sm:px-12 lg:px-20">
        <div className="rounded-3xl border-2 border-green-200 bg-white p-8 sm:p-12">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5">
                  <Zap className="w-4 h-4 text-green-600 fill-green-600" />
                  <span className="text-sm font-semibold text-green-700">PRODUCTOS DESTACADOS</span>
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                Nuestros{' '}
                <span className="text-green-600">Productos</span>
              </h2>
              <p className="text-gray-600 text-lg mt-3 max-w-xl">
                Compra por internet y obtén el mejor precio. Recoge en tienda o recíbelo a domicilio.
              </p>
            </div>
            <Link
              href="/productos"
              className="group flex items-center gap-2 bg-white hover:bg-green-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border-2 border-green-200 transition-all duration-300"
            >
              Ver Catálogo Completo
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Pronto tendremos ofertas especiales para ti</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const discountValue = product.discount ?? 0
                const hasDiscount = discountValue > 0
                const discountPercent =
                  hasDiscount && product.price > 0
                    ? Math.round(((product.price - discountValue) / product.price) * 100)
                    : 0

                return (
                  <div
                    key={product._id}
                    className="group relative bg-white rounded-2xl border-2 border-green-100 p-6 hover:border-green-300 transition-all duration-500 hover:shadow-lg hover:shadow-green-900/10 hover:-translate-y-1"
                  >
                    {/* Discount badge */}
                    {hasDiscount && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="relative">
                            <div className="bg-green-600 text-white font-black text-sm px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            -{discountPercent}%
                          </div>
                          <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-green-700" />
                        </div>
                      </div>
                    )}

                    {/* Image */}
                    <Link href={`/productos/${product._id}`}>
                      <div className="relative h-64 rounded-xl overflow-hidden mb-5 bg-white">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {product.categoria || 'Producto Natural'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>

                      {/* Price */}
                      {hasDiscount ? (
                        <div className="flex gap-6 mb-3">
                          <div>
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Precio Internet</span>
                            <p className="text-3xl font-black text-green-600">
                              {formatPrice(discountValue)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio en Tienda</span>
                            <p className="text-2xl font-bold text-gray-700">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-6 mb-3">
                          <div>
                            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Precio</span>
                            <p className="text-3xl font-black text-green-600">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-4">
                        <Timer className="w-4 h-4 text-green-500/70" />
                        <span className="text-sm text-gray-500">
                          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                        </span>
                      </div>

                      {product.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/productos/${product._id}`}
                          className="flex-1 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                        >
                          Ver Detalle
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        {product.stock > 0 && (
                          <button
                            onClick={async () => {
                              try {
                                await addItem(product._id, 1)
                                showToast.success(`${product.name} agregado al carrito`)
                              } catch (err) {
                                if (err instanceof Error && err.message === 'not_authenticated') {
                                  window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
                                  return
                                }
                                showToast.error('Error al agregar al carrito')
                              }
                            }}
                            className="py-3 px-5 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20 px-6 sm:px-12 lg:px-20 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                ¿Por qué elegir{' '}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-green-600 to-emerald-600">
                  Fenapicol Tiendas
                </span>
                ?
              </h2>

              <div className="space-y-5">
                {[
                  'Ingredientes 100% naturales y orgánicos',
                  'Procesos de extracción de alta tecnología',
                  'Laboratorios certificados y regulados',
                  'Garantía de satisfacción o devolución',
                  'Envío discreto y seguro a todo el país',
                  'Atención personalizada especializada',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-green-100 to-emerald-100 border border-green-200" />

              <div className="relative z-10 text-center px-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600 mb-3">
                  +25 Años
                </div>
                <p className="text-gray-600 text-lg">de experiencia en productos naturales</p>
                <div className="mt-6 inline-block px-6 py-3 rounded-full bg-green-100 border border-green-300 text-green-700 font-semibold">
                  Confianza Comprobada
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-linear-to-r from-green-100 to-emerald-100 border border-green-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforma tu bienestar hoy</h2>
            <p className="text-gray-600 text-lg mb-8">
              Únete a miles de clientes satisfechos que ya confían en nuestros productos
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-bold text-lg bg-linear-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Leaf className="w-5 h-5" />
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
