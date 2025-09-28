
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

export default function serrviciosPage() {
  return (
       <div className="min-h-screen">
          {/* Sección de texto hero */}
          <section className="h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative z-10 text-center px-4 max-w-4xl">
              <h1 className={`${inter.className} text-5xl md:text-7xl font-black mb-6`}>
                <span>Servicios</span>
              </h1>
              <h2 className={`${cormorantGaramond.className} text-4xl md:text-6xl font-normal text-gray-700`}>
                Mas que belleza, confianza
              </h2>
            </div>
          </section>
    
          {/* Sección del carrusel */}
          
        </div>
  )
}