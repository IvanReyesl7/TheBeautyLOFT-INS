// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed de servicios...')

  // Limpiar datos existentes (opcional)
  await prisma.citaServicio.deleteMany()
  await prisma.cita.deleteMany()
  await prisma.servicio.deleteMany()

  // Servicios de Cabello
  const serviciosCabello = [
    
    {
      nombre: 'Mechas/Highlights',
      descripcion: 'Iluminación parcial para dar profundidad y volumen al cabello',
      precio: 75.00,
      duracion: 150,
      imagenUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      activo: true
    },
    {
      nombre: 'Tratamiento Capilar Profundo',
      descripcion: 'Hidratación intensiva con keratina y aceites naturales',
      precio: 45.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
      activo: true
    },
    {
      nombre: 'Peinado para Eventos',
      descripcion: 'Peinado elegante para bodas, graduaciones y eventos especiales',
      precio: 40.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800',
      activo: true
    }
  ]

  // Servicios de Uñas
  const serviciosUnas = [
    {
      nombre: 'Manicure Básico',
      descripcion: 'Limpieza, limado, cutícula y esmaltado básico',
      precio: 15.00,
      duracion: 45,
      imagenUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
      activo: true
    },
    {
      nombre: 'Manicure Spa',
      descripcion: 'Manicure completo con exfoliación, masaje y parafina',
      precio: 25.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1610992015762-45dca7656f97?w=800',
      activo: true
    },
    {
      nombre: 'Manicure con Gel',
      descripcion: 'Manicure con esmalte de gel que dura hasta 3 semanas',
      precio: 30.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800',
      activo: true
    },
    {
      nombre: 'Pedicure Básico',
      descripcion: 'Limpieza, exfoliación, limado y esmaltado de pies',
      precio: 20.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1595905022029-02e6602f5b4b?w=800',
      activo: true
    },
    {
      nombre: 'Pedicure Spa',
      descripcion: 'Pedicure deluxe con baño de pies, masaje y parafina',
      precio: 30.00,
      duracion: 75,
      imagenUrl: 'https://images.unsplash.com/photo-1599948128020-9a44f2256d47?w=800',
      activo: true
    },
    {
      nombre: 'Uñas Acrílicas',
      descripcion: 'Extensión de uñas con acrílico y diseño personalizado',
      precio: 45.00,
      duracion: 90,
      imagenUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800',
      activo: true
    }
  ]

  // Servicios Faciales
  const serviciosFaciales = [
    {
      nombre: 'Facial Hidratante',
      descripcion: 'Tratamiento intensivo de hidratación para piel seca',
      precio: 45.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800',
      activo: true
    },
    {
      nombre: 'Facial Anti-edad',
      descripcion: 'Tratamiento anti-arrugas con productos premium',
      precio: 65.00,
      duracion: 75,
      imagenUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
      activo: true
    },
    {
      nombre: 'Microdermoabrasión',
      descripcion: 'Exfoliación profunda para renovación celular',
      precio: 55.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
      activo: true
    }
  ]

  // Servicios de Depilación
  const serviciosDepilacion = [
    {
      nombre: 'Depilación Facial',
      descripcion: 'Depilación de labio superior, cejas y mentón',
      precio: 15.00,
      duracion: 20,
      imagenUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
      activo: true
    },
    {
      nombre: 'Depilación Brasileña',
      descripcion: 'Depilación completa de zona íntima',
      precio: 35.00,
      duracion: 30,
      imagenUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800',
      activo: true
    }
  ]

  // Servicios de Maquillaje
  const serviciosMaquillaje = [

    {
      nombre: 'Maquillaje de Novia',
      descripcion: 'Maquillaje profesional para el día más especial',
      precio: 80.00,
      duracion: 90,
      imagenUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
      activo: true
    },
    {
      nombre: 'Maquillaje Express',
      descripcion: 'Maquillaje rápido para el día a día',
      precio: 25.00,
      duracion: 30,
      imagenUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',
      activo: true
    }
  ]

  // Servicios de Masajes
  const serviciosMasajes = [
    {
      nombre: 'Masaje Relajante',
      descripcion: 'Masaje corporal completo con aromaterapia',
      precio: 50.00,
      duracion: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      activo: true
    },
    {
      nombre: 'Masaje con Piedras Calientes',
      descripcion: 'Relajación profunda con terapia de piedras volcánicas',
      precio: 70.00,
      duracion: 75,
      imagenUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
      activo: true
    }
  ]

  // Combinar todos los servicios
  const todosLosServicios = [
    ...serviciosCabello,
    ...serviciosUnas,
    ...serviciosFaciales,
    ...serviciosDepilacion,
    ...serviciosMaquillaje,
    ...serviciosMasajes
  ]

  // Crear servicios en la base de datos
  for (const servicio of todosLosServicios) {
    await prisma.servicio.create({ data: servicio })
  }

  console.log(`✅ Seed completado: ${todosLosServicios.length} servicios creados`)
  console.log(`   - ${serviciosCabello.length} servicios de cabello`)
  console.log(`   - ${serviciosUnas.length} servicios de uñas`)
  console.log(`   - ${serviciosFaciales.length} servicios faciales`)
  console.log(`   - ${serviciosDepilacion.length} servicios de depilación`)
  console.log(`   - ${serviciosMaquillaje.length} servicios de maquillaje`)
  console.log(`   - ${serviciosMasajes.length} servicios de masajes`)
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })