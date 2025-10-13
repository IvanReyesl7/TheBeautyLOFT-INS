import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; // Ajusta el path

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Faltan credenciales" }, { status: 400 });
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return NextResponse.json({ message: "Usuario no existe" }, { status: 401 });
    }

    // Contraseña en texto plano
    if (usuario.password !== password) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Guardar token en cookie
    const response = NextResponse.json({ message: "Login exitoso" });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 horas
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
