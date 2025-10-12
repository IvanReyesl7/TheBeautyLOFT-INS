// app/(dashboard)/servicios/agregar/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Configurar las fuentes
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400']
});

export default function AgregarServicio() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const validationErrors: string[] = [];

    // Nombre 
    if (nombre.trim().length < 3) {
      validationErrors.push("El nombre debe tener al menos 3 caracteres.");
    }

    // Precio 
    if (!precio || parseFloat(precio) <= 0) {
      validationErrors.push("El precio debe ser mayor a 0.");
    }

    // Duración 
    if (!duracion || parseInt(duracion) <= 0) {
      validationErrors.push("La duración debe ser mayor a 0 minutos.");
    }

    if (parseInt(duracion) % 15 !== 0) {
      validationErrors.push("La duración debe ser múltiplo de 15 minutos.");
    }

    //imagen
    if (imagenUrl && !/^https?:\/\/.+\..+/.test(imagenUrl)) {
      validationErrors.push("La URL de la imagen no es válida.");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('/api/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          descripcion: descripcion.trim() || null,
          precio: parseFloat(precio),
          duracion: parseInt(duracion),
          imagenUrl: imagenUrl.trim() || null,
          activo: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el servicio');
      }

      const data = await response.json();
      alert('¡Servicio creado exitosamente!');
      
    
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error:', error);
      setErrors([error.message || 'Error al crear el servicio']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Dashboard
          </button>
          <h1 className={`${inter.className} text-3xl font-bold text-center text-gray-800`}>
            Agregar Nuevo Servicio
          </h1>
        </div>

        {/* Errores */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            <ul className="list-disc list-inside text-sm">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre del Servicio */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Servicio *
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Servicio"
              required
              className="w-full px-4 py-3 bg-[#D9D9D9] text-black border-none rounded-lg focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el servicio..."
              rows={4}
              className="w-full px-4 py-3 bg-[#D9D9D9] text-black border-none rounded-lg resize-none focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          {/* Precio y Duración */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (USD) *
              </label>
              <input
                type="number"
                id="precio"
                step="0.01"
                min="0"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="25.00"
                required
                className="w-full px-4 py-3 bg-[#D9D9D9] text-black border-none rounded-lg focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="duracion" className="block text-sm font-medium text-gray-700 mb-1">
                Duración (minutos) *
              </label>
              <input
                type="number"
                id="duracion"
                step="15"
                min="15"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                placeholder="15"
                required
                className="w-full px-4 py-3 bg-[#D9D9D9] text-black border-none rounded-lg focus:ring-2 focus:ring-gray-400 transition"
              />
              <p className="text-xs text-gray-500 mt-1">Debe ser múltiplo de 15</p>
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label htmlFor="imagenUrl" className="block text-sm font-medium text-gray-700 mb-1">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imagenUrl"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-[#D9D9D9] text-black border-none rounded-lg focus:ring-2 focus:ring-gray-400 transition"
            />
            <p className="text-xs text-gray-500 mt-1">Opcional - Pega la URL completa de la imagen</p>
          </div>

          {/* Vista Previa de Imagen */}
          {imagenUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vista Previa
              </label>
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={imagenUrl}
                  alt="Preview del servicio"
                  fill
                  className="object-cover"
                  onError={() => setErrors([...errors, 'URL de imagen inválida'])}
                />
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Servicio'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}