"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>("Usuario Ejemplo");

  // 🔐 En un futuro aquí validarás la sesión desde cookies o JWT
  useEffect(() => {
    const isAuthenticated = true; // simulado
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  // Interfaces
  interface Servicio {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: number;
    duracion: number;
    imagenUrl: string | null;
    activo: boolean;
  }

  interface Cita {
    id: number;
    clienteId: number;
    fechaHora: string;
    estado: string;
    notas: string | null;
    createdAt: string;
    updatedAt: string;
    cliente: {
      id: number;
      nombre: string;
      apellido: string | null;
      email: string;
      telefono: string;
    };
    servicios: Array<{
      id: number;
      citaId: number;
      servicioId: number;
      servicio: {
        id: number;
        nombre: string;
        precio: number;
        duracion: number;
      };
    }>;
  }

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  {
    /*Servicios */
  }
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
      }
    }
    fetchServicios();
  }, []);

  {
    /*Servicios */
  }
  useEffect(() => {
    async function fetchCitas() {
      try {
        const response = await fetch("/api/citas");
        if (!response.ok) {
          throw new Error("Error al cargar citas");
        }
        const data = await response.json();
        setCitas(data);
      } catch (err) {
        console.log("Error", err);
        setError("No se pudo cargar las citas");
      }
    }
    fetchCitas();
  }, []);

  const citasPendientes = citas.filter((c) => c.estado === "PENDIENTE").length;
  const serviciosActivos = servicios.filter((s) => s.activo).length;

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">The Beauty LOFT</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium">{user}</span>
          <Button
            onClick={handleLogout}
            className="bg-white text-black px-3 py-1 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Cerrar sesión
          </Button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta 1 - Citas pendientes */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Citas pendientes
          </h2>
          <p className="text-gray-600">
            Tienes {citasPendientes} reservas por confirmar.
          </p>

          <div>
            {citas.map((citas) => (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {citas.cliente.nombre} {citas.cliente.apellido}
                </h2>
                <p className="text-gray-700 mb-4">{citas.cliente.telefono}</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta 2 - Servicios */}
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Servicios</h2>
          <p className="text-gray-600">{serviciosActivos} servicios activos.</p>
        </div>

        
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-gray-600">
        ©️ 2025 The Beauty LOFT. Todos los derechos reservados.
      </footer>
    </section>
  );
}
