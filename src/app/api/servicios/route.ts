import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const servicios = await prisma.servicio.findMany({
      where: { activo: true }
    })
    return NextResponse.json(servicios)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const servicio = await prisma.servicio.create({
      data: body
    })
    return NextResponse.json(servicio, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
  }

}