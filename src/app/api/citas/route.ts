import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  try {
  const cita = await prisma.Cita.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        servicio: data.servicio,
        fecha: new Date(data.fecha),
        hora: data.hora,
      },
    });
    return NextResponse.json({ ok: true, cita });
  } catch (error) {
  let errorMsg = 'Error desconocido';
  if (error instanceof Error) errorMsg = error.message;
  return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
