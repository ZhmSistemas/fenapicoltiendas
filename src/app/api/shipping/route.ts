import { NextRequest } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import ShippingModel from '@/lib/models/ShippingModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return Response.json({ message: 'No autenticado' }, { status: 401 })
    }

    await dbConnect()
    const shipping = await ShippingModel.findOne({ userId: session.user.id })

    return Response.json(shipping ?? {}, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return Response.json({ message }, { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return Response.json({ message: 'No autenticado' }, { status: 401 })
    }

    await dbConnect()
    const body = await request.json()
    const { nombreCompleto, direccion, ciudad, whatsapp, barrio, items, subtotal, discount, total } = body

    if (!nombreCompleto || !direccion || !ciudad || !whatsapp || !barrio) {
      return Response.json({ message: 'Todos los campos son obligatorios' }, { status: 400 })
    }

    if (!items || items.length === 0) {
      return Response.json({ message: 'No hay productos en el pedido' }, { status: 400 })
    }

    const shipping = await ShippingModel.findOneAndUpdate(
      { userId: session.user.id },
      {
        userId: session.user.id,
        nombreCompleto,
        direccion,
        ciudad,
        whatsapp,
        barrio,
        items,
        subtotal: subtotal ?? 0,
        discount: discount ?? 0,
        total: total ?? 0,
      },
      { upsert: true, new: true, runValidators: true }
    )

    return Response.json(shipping, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return Response.json({ message }, { status: 500 })
  }
}
