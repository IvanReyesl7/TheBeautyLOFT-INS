import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { nombre, apellido, email, telefono, servicioId, fechaHora, estado } = await request.json()

    
    if (!nombre || !email || !telefono || !servicioId || !fechaHora) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    
    let cliente = await prisma.cliente.findUnique({
      where: { email }
    })

    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: {
          nombre,
          apellido: apellido || '',
          email,
          telefono
        }
      })
    }

    
    const fechaCita = new Date(fechaHora)
    const citaExistente = await prisma.cita.findFirst({
      where: {
        fechaHora: fechaCita,
        estado: { not: 'CANCELADA' }
      }
    })

    if (citaExistente) {
      return NextResponse.json(
        { error: 'Ya existe una cita en ese horario' },
        { status: 409 }
      )
    }

    
    const nuevaCita = await prisma.cita.create({
      data: {
        clienteId: cliente.id,
        fechaHora: fechaCita,
        estado: estado || 'PENDIENTE',
        servicios: {
          create: {
            servicioId: servicioId
          }
        }
      },
      include: {
        cliente: true,
        servicios: {
          include: {
            servicio: true
          }
        }
      }
    })

    return NextResponse.json(nuevaCita, { status: 201 })
  } catch (error) {
    console.error('Error creando cita:', error)
    return NextResponse.json(
      { error: 'Error interno al crear la cita' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        cliente: true,
        servicios: {
          include: {
            servicio: true,
          },
        },
      },
      orderBy: { fechaHora: "desc" },
    });

    return NextResponse.json(citas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.json(
      { error: "Error interno al obtener citas" },
      { status: 500 }
    );
  }
}