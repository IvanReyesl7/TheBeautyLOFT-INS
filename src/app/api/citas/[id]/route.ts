
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cita = await prisma.cita.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        cliente: true,
        servicios: {
          include: {
            servicio: true
          }
        }
      }
    })

    if (!cita) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }

    return NextResponse.json(cita)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener cita' }, { status: 500 })
  }
}

// Actualizar cita (cancelar, cambiar estado, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const citaActualizada = await prisma.cita.update({
      where: { id: parseInt(params.id) },
      data: body,
      include: {
        cliente: true,
        servicios: {
          include: {
            servicio: true
          }
        }
      }
    })

    return NextResponse.json(citaActualizada)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al actualizar cita' }, { status: 500 })
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cita.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Cita eliminada' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al eliminar cita' }, { status: 500 })
  }
}