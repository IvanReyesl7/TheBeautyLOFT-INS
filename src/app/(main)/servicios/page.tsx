"use client";
import React from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

// Configurar las fuentes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  duracion: number;
  imagenUrl: string | null;
  activo: boolean;
}

export default function ServicesPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const response = await fetch("/api/servicios");

        if (!response.ok) {
          throw new Error("Error al cargar servicios");
        }
        const data = await response.json();
        setServicios(data);
      } catch (err) {
        console.log("Error", err);
        setError("No se pudo cargar los servicios");
        setLoading(true);
      }
    }
    fetchServicios()
  },[]);

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1
            className={`${inter.className} text-4xl md:text-6xl lg:text-7xl font-black mb-4`}
          >
            <span>The Beauty LOFT</span>
          </h1>
          <h2
            className={`${cormorantGaramond.className} text-2xl md:text-4xl lg:text-5xl font-normal text-gray-700`}
          >
            Servicios
          </h2>
        </div>
      </section>

      <section className="pt-24 pb-8 px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <div className="relative w-full h-48 bg-gray-200">
                {servicio.imagenUrl ? (
                  <Image
                    src={servicio.imagenUrl}
                    alt={servicio.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {servicio.nombre}
                </h2>
                <p className="text-gray-700 mb-4">{servicio.descripcion}</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span className="font-semibold text-black text-lg">
                    ${Number(servicio.precio).toFixed(2)}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {servicio.duracion} min
                  </span>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  <Link href="/agendarCita">Reserva</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-white mb-6 text-lg">
            También puedes contactarnos directamente:
          </p>
          <div className="space-y-4 text-white">
            <p className="flex items-center justify-center text-base">
              <span className="mr-3">📧</span>
              info@thebeautyloft.com
            </p>
            <p className="flex items-center justify-center text-base">
              <span className="mr-3">📞</span>
              +503 1234-5678
            </p>
            <p className="flex items-center justify-center text-base">
              <span className="mr-3">📍</span>
              San Salvador, El Salvador
            </p>
          </div>

          {/* Línea separadora opcional */}
          <hr className="border-gray-600 my-8 max-w-md mx-auto" />

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2024 The Beauty LOFT. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
