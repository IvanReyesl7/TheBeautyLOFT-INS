import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cita = await prisma.Cita.findFirst();
    if (!cita) {
      return NextResponse.json({ ok: false, error: 'No hay citas para eliminar' }, { status: 404 });
    }
    await prisma.Cita.delete({ where: { id: cita.id } });
    return NextResponse.json({ ok: true, deleted: cita });
  } catch (error) {
    let errorMsg = 'Error desconocido';
    if (error instanceof Error) errorMsg = error.message;
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
