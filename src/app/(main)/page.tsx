import Image from "next/image";
import { Inter, Cormorant_Garamond } from 'next/font/google'

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
    <section className="h-screen relative flex items-center justify-center overflow-hidden pt-16">
      <div className=" relative z-10 text-center px-4 max-w-4xl">
        <h1 className={`${inter.className} text-5xl md:text-7xl font-black`}><span>The Beauty LOFT</span></h1>
        <h2 className={`${cormorantGaramond.className} text-5xl md:text-7xl font-black`}>Mas que belleza, confianza</h2>
      </div>
    </section>
  );
}
