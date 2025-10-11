"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>("Usuario Ejemplo");

  useEffect(() => {
    const isAuthenticated = true;
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

  // Fetch Servicios
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

  // Fetch Citas
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
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
        {/* Tarjeta 1 - Citas pendientes */}
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Citas pendientes
            </h2>
            <p className="text-gray-600">
              Tienes {citasPendientes} reservas por confirmar.
            </p>
          </div>

          <ScrollArea className="flex-1 h-[600px]">
            <div className="p-4">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Nombre</th>
                    <th className="border border-gray-300 p-2 text-left">Apellido</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">Teléfono</th>
                    <th className="border border-gray-300 p-2 text-left">Servicio</th>
                    <th className="border border-gray-300 p-2 text-left">Duración</th>
                    <th className="border border-gray-300 p-2 text-left">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.length > 0 ? (
                    citas.map((cita) => (
                      <tr key={cita.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{cita.cliente?.nombre}</td>
                        <td className="border border-gray-300 p-2">{cita.cliente?.apellido}</td>
                        <td className="border border-gray-300 p-2">{cita.cliente?.email}</td>
                        <td className="border border-gray-300 p-2">{cita.cliente?.telefono}</td>
                        <td className="border border-gray-300 p-2">
                          {cita.servicios?.[0]?.servicio?.nombre || "Sin servicio"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {cita.servicios?.[0]?.servicio?.duracion || "—"} min
                        </td>
                        <td className="border border-gray-300 p-2">
                          {cita.fechaHora
                            ? new Date(cita.fechaHora).toLocaleString("es-ES", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })
                            : "Sin fecha"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center p-4 text-gray-500">
                        No hay citas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </div>

        {/* Tarjeta 2 - Servicios */}
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Servicios</h2>
            <p className="text-gray-600">{serviciosActivos} servicios activos.</p>
          </div>

          <ScrollArea className="flex-1 h-[600px]">
            <div className="p-4 space-y-4">
              {servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {servicio.nombre}
                    </h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      {servicio.descripcion || "Sin descripción"}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-black text-lg">
                        ${Number(servicio.precio).toFixed(2)}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {servicio.duracion} min
                      </span>
                    </div>
                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                      <Link href="/agendarCita">Editar</Link>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay servicios disponibles.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-gray-600">
        ©️ 2025 The Beauty LOFT. Todos los derechos reservados.
      </footer>
    </section>
  );
}