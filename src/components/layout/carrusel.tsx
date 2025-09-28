"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const carouselImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Salón de belleza moderno",
    title: "Ambiente Elegante",
    description: "Espacios diseñados para tu comodidad"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Servicios de manicure",
    title: "Manicure Premium",
    description: "Cuidado profesional para tus manos"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Tratamientos faciales",
    title: "Tratamientos Faciales",
    description: "Rejuvenece tu piel naturalmente"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Cortes de cabello",
    title: "Cortes Modernos",
    description: "Estilo que refleja tu personalidad"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Maquillaje profesional",
    title: "Maquillaje Profesional",
    description: "Para eventos especiales"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    alt: "Pedicure relajante",
    title: "Pedicure Spa",
    description: "Relajación total para tus pies"
  }
]

export default function carrusel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Plugin de autoplay
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Título del carrusel */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre la variedad de servicios que tenemos para ti
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full max-w-7xl mx-auto"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {carouselImages.map((image) => (
              <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-0">
                    {/* Imagen */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay sutil */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {image.description}
                      </p>
                      <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                        Ver Más
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Controles del carrusel */}
          <CarouselPrevious className="left-2 bg-white/90 border-gray-200 text-gray-700 hover:bg-white shadow-md" />
          <CarouselNext className="right-2 bg-white/90 border-gray-200 text-gray-700 hover:bg-white shadow-md" />
        </Carousel>

        {/* Indicadores de puntos */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(carouselImages.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor((current - 1) / 3) === index
                  ? "bg-black scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => api?.scrollTo(index * 3)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}