"use client";
import React from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

// Configurar las fuentes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

const services = [
  {
    id: "corte",
    nombre: "Corte de cabello + peinado",
    descripcion: "Transforma tu look con un corte profesional y peinado estilizado.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "manicure",
    nombre: "Manicure & Pedicure",
    descripcion: "Uñas impecables y relajación total para tus manos y pies.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "facial",
    nombre: "Tratamiento facial hidratante",
    descripcion: "Hidrata y rejuvenece tu piel con nuestro tratamiento facial premium.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "spa",
    nombre: "Spa relajante con aromaterapia",
    descripcion: "Relaja tu cuerpo y mente con un spa completo y aromas terapéuticos.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    id: "maquillaje",
    nombre: "Maquillaje para eventos",
    descripcion: "Luce radiante en cualquier ocasión con maquillaje profesional.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className={`${inter.className} text-4xl md:text-6xl lg:text-7xl font-black mb-4`}>
            <span>The Beauty LOFT</span>
          </h1>
          <h2 className={`${cormorantGaramond.className} text-2xl md:text-4xl lg:text-5xl font-normal text-gray-700`}>
            Servicios
          </h2>
        </div>
      </section>

      <section className="pt-24 pb-8 px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={service.img}
                alt={service.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {service.nombre}
                </h2>
                <p className="text-gray-700 mb-4">{service.descripcion}</p>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  <Link href='/agendarCita'>Reserva</Link>
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