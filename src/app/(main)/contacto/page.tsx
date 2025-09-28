import Image from "next/image";
import { Inter, Cormorant_Garamond } from "next/font/google";
import HeroCarrusel from "@/components/layout/carrusel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Configurar las fuentes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Sección de contacto */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Título principal centrado */}
          <h1 className={`${inter.className} text-5xl md:text-7xl font-black mb-6 text-center`}>
            <span>The Beauty LOFT</span>
          </h1>
          
          <h2 className={`${cormorantGaramond.className} text-4xl md:text-6xl font-normal text-gray-700 text-center mb-12`}>
            Contacto
          </h2>

          {/* Formulario de contacto */}
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              {/* Input Nombre Completo */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </Label>
                <Input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  className="w-full px-4 py-3 bg-[#D9D9D9] text-black placeholder:text-gray-600 border-none focus:ring-2 focus:ring-gray-400 rounded-lg"
                  required
                />
              </div>

              {/* Input Correo */}
              <div className="space-y-2">
                <Label htmlFor="correo" className="text-sm font-medium text-gray-700">
                  Correo Electrónico
                </Label>
                <Input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 bg-[#D9D9D9] text-black placeholder:text-gray-600 border-none focus:ring-2 focus:ring-gray-400 rounded-lg"
                  required
                />
              </div>

              {/* Textarea Mensaje */}
              <div className="space-y-2">
                <Label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
                  Mensaje
                </Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 bg-[#D9D9D9] text-black placeholder:text-gray-600 border-none focus:ring-2 focus:ring-gray-400 rounded-lg resize-none"
                  required
                />
              </div>

              {/* Botón Enviar */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  Enviar
                </Button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* Footer con información de contacto */}
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
