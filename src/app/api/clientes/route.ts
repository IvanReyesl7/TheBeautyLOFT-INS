import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany()
    return NextResponse.json(clientes)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cliente = await prisma.cliente.create({
      data: body
    })
    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al crear servicio' }, { status: 500 })
  }

}