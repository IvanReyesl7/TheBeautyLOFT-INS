import Image from "next/image";
import { Inter, Cormorant_Garamond } from "next/font/google";
import HeroCarrusel from "@/components/layout/carrusel";

// Configurar las fuentes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

export default function acercaPage() {
  return (
    <div className="min-h-screen">
      {/* Sección de texto hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Título principal centrado */}
        <div className="container mx-auto px-4 max-w-6xl">
          <h1
            className={`${inter.className} text-5xl md:text-7xl font-black mb-16 text-center`}
          >
            <span>The Beauty LOFT</span>
          </h1>
          
          {/* Sección en dos columnas */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Columna de la imagen */}
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Interior del salón de belleza The Beauty LOFT"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Columna del contenido */}
            <div className="space-y-6">
              <h2
                className={`${cormorantGaramond.className} text-4xl md:text-5xl font-normal text-gray-800`}
              >
                ¿Quiénes Somos?
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                En The Beauty LOFT, creemos que cada persona merece sentirse
                hermosa y confiada. Nuestro equipo de profesionales está
                dedicado a brindarte una experiencia única de belleza y
                bienestar.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Con más de 10 años de experiencia en la industria de la belleza,
                nos especializamos en crear looks personalizados que resalten tu
                estilo único y tu personalidad.
              </p>
              
              {/* Elementos adicionales opcionales */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Nuestra Filosofía
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Atención personalizada para cada cliente
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Productos de la más alta calidad
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Ambiente relajante y profesional
                  </li>
                </ul>
              </div>
            </div>
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
