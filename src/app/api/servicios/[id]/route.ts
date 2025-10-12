
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const servicio = await prisma.servicio.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!servicio) {
      return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 })
    }

    return NextResponse.json(servicio)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener servicio' }, { status: 500 })
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const servicioActualizado = await prisma.servicio.update({
      where: { id: parseInt(params.id) },
      data: body
    })

    return NextResponse.json(servicioActualizado)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar servicio' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    const servicio = await prisma.servicio.update({
      where: { id: parseInt(params.id) },
      data: { activo: false }
    })

    

    return NextResponse.json({ message: 'Servicio desactivado', servicio })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar servicio' }, { status: 500 })
  }
}