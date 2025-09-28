import Image from "next/image";
import { Inter, Cormorant_Garamond } from 'next/font/google'
import HeroCarrusel from "@/components/layout/carrusel"

// Configurar las fuentes
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400']
})

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sección hero compacta - Solo título */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className={`${inter.className} text-4xl md:text-6xl lg:text-7xl font-black mb-4`}>
            <span>The Beauty LOFT</span>
          </h1>
          <h2 className={`${cormorantGaramond.className} text-2xl md:text-4xl lg:text-5xl font-normal text-gray-700`}>
            Más que belleza, confianza
          </h2>
        </div>
      </section>

      {/* Sección del carrusel - Inmediatamente después del título */}
      <section className="bg-white">
        <HeroCarrusel />
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