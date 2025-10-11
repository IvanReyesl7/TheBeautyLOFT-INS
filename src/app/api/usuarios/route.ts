import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany()
    return NextResponse.json(usuarios)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const usuario = await prisma.usuario.create({
      data: body
    })
    return NextResponse.json(usuario, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  }

}