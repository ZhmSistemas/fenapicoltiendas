'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Loader, MapPin, Phone, User, Home, Building2, Plus, Minus, Package, Trash2 } from 'lucide-react'
import { showToast } from 'nextjs-toast-notify'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/formatPrice'

const envioSchema = z.object({
  nombreCompleto: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  direccion: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  ciudad: z.string().min(2, 'La ciudad es obligatoria'),
  whatsapp: z.string().min(1, 'El WhatsApp es obligatorio'),
  barrio: z.string().min(2, 'El barrio es obligatorio'),
})

type EnvioFormInputs = z.infer<typeof envioSchema>

export default function EnvioPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, total, itemCount, subtotal, discount, clearCart, updateQuantity, removeItem } = useCart()
  const [saving, setSaving] = useState(false)
  const fetchedRef = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnvioFormInputs>({
    resolver: zodResolver(envioSchema),
    defaultValues: {
      nombreCompleto: '',
      direccion: '',
      ciudad: '',
      whatsapp: '',
      barrio: '',
    },
  })

  useEffect(() => {
    if (status === 'loading' || fetchedRef.current) return

    if (status === 'unauthenticated') {
      fetchedRef.current = true
      return
    }

    fetchedRef.current = true

    const fetchShipping = async () => {
      try {
        const res = await fetch('/api/shipping')
        if (res.ok) {
          const data = await res.json()
          if (data.nombreCompleto) {
            reset({
              nombreCompleto: data.nombreCompleto || '',
              direccion: data.direccion || '',
              ciudad: data.ciudad || '',
              whatsapp: data.whatsapp || '',
              barrio: data.barrio || '',
            })
          } else if (session?.user) {
            reset({
              nombreCompleto: session.user.name || '',
              whatsapp: session.user.whatsapp || '',
            })
          }
        }
      } catch {
        // ignore
      }
    }

    fetchShipping()
  }, [status, session, reset])

  const onSubmit = async (data: EnvioFormInputs) => {
    setSaving(true)
    try {
      const res = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items,
          subtotal,
          discount,
          total,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Error al guardar datos de envío')
      }

      await clearCart()

      router.push('/checkout/confirmacion')
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : 'Error al guardar', {
        duration: 4000,
        position: 'top-center',
      })
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto px-6 py-24">
          <button
            onClick={() => router.push('/carrito')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al carrito</span>
          </button>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Necesitas iniciar sesión</h2>
            <p className="text-gray-500 mb-8">
              Para continuar con el envío, debes tener una cuenta. Regístrate o inicia sesión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="px-8 py-3 rounded-xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-3 rounded-xl font-bold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-all duration-300"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <button
          onClick={() => router.push('/carrito')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al carrito</span>
        </button>

        <h1 className="text-4xl font-black text-gray-900 mb-2">Datos de envío</h1>
        <p className="text-gray-500 mb-8">
          {itemCount > 0 ? `${itemCount} producto${itemCount !== 1 ? 's' : ''} · Total ${formatPrice(total)}` : 'Carrito vacío'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de entrega</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="nombreCompleto"
                      type="text"
                      {...register('nombreCompleto')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  {errors.nombreCompleto && (
                    <p className="mt-1 text-sm text-red-500">{errors.nombreCompleto.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1.5">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="whatsapp"
                      type="tel"
                      {...register('whatsapp')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Ej: +591 71234567"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="mt-1 text-sm text-red-500">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dirección
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="direccion"
                      type="text"
                      {...register('direccion')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Ej: Av. Siempre Viva #123"
                    />
                  </div>
                  {errors.direccion && (
                    <p className="mt-1 text-sm text-red-500">{errors.direccion.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Ciudad
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="ciudad"
                        type="text"
                        {...register('ciudad')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Ej: Santa Cruz"
                      />
                    </div>
                    {errors.ciudad && (
                      <p className="mt-1 text-sm text-red-500">{errors.ciudad.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="barrio" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Barrio
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="barrio"
                        type="text"
                        {...register('barrio')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Ej: Equipetrol"
                      />
                    </div>
                    {errors.barrio && (
                      <p className="mt-1 text-sm text-red-500">{errors.barrio.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl font-bold text-white bg-linear-to-r from-green-500 to-emerald-500 hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar datos de envío'
                  )}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Productos</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-200"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
                      <p className="text-gray-900 font-semibold truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.discount && item.discount > 0 ? (
                          <>
                            <span className="text-sm font-bold text-green-600">{formatPrice(item.discount)}</span>
                            <span className="text-xs text-gray-400 line-through">{formatPrice(item.price)}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-green-600">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-gray-900 font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                {itemCount} producto{itemCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
