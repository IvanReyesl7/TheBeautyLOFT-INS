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

  const handleRegister = () => {
    setUser(null);
    router.push("/register");
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

  const handleFinalizarCita = async (citaId: number) => {
    if (!confirm("¿Estás seguro de que quieres completar esta cita?")) {
      return;
    }

    try {
      const response = await fetch(`/api/citas/${citaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "COMPLETADA" }),
      });

      if (response.ok) {
        setCitas(
          citas.map((cita) =>
            cita.id === citaId ? { ...cita, estado: "COMPLETADA" } : cita
          )
        );
        alert("Cita finalizada exitosamente");
      } else {
        throw new Error("Error al finalizar cita");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al finalizar la cita");
    }
  };

  const handleCancelarCita = async (citaId: number) => {
    if (!confirm("¿Estás seguro de que quieres cancelar esta cita?")) {
      return;
    }

    try {
      const response = await fetch(`/api/citas/${citaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "CANCELADA" }),
      });

      if (response.ok) {
        // Actualizar citas
        setCitas(
          citas.map((cita) =>
            cita.id === citaId ? { ...cita, estado: "CANCELADA" } : cita
          )
        );
        alert("Cita cancelada exitosamente");
      } else {
        throw new Error("Error al cancelar cita");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cancelar la cita");
    }
  };

  const citasPendientes = citas.filter((c) => c.estado === "PENDIENTE").length;
  const serviciosActivos = servicios.filter((s) => s.activo).length;

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">The Beauty LOFT</h1>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleRegister}
            className="bg-white text-black px-3 py-1 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Agregar usuario
          </Button>
        </div>
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
            <div className="p-4 space-y-4">
              {citas.length > 0 ? (
                citas.map((cita) => (
                  <div
                    key={cita.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all hover:shadow-md"
                  >
                    {/* Información del cliente */}
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-black mb-1">
                        {cita.cliente.nombre} {cita.cliente.apellido}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cita.cliente.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {cita.cliente.telefono}
                      </p>
                    </div>

                    {/* Servicios de la cita */}
                    <div className="mb-3 bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Servicios:
                      </p>
                      {cita.servicios.map((servicio) => (
                        <div
                          key={servicio.id}
                          className="flex justify-between text-sm"
                        >
                          <span>• {servicio.servicio.nombre}</span>
                          <span className="font-medium">
                            ${Number(servicio.servicio.precio).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Fecha y hora */}
                    <div className="mb-3 text-sm text-gray-600">
                      <p>
                        <strong>Fecha:</strong>{" "}
                        {new Date(cita.fechaHora).toLocaleDateString("es-ES")}
                      </p>
                      <p>
                        <strong>Hora:</strong>{" "}
                        {new Date(cita.fechaHora).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Estado */}
                    <div className="mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          cita.estado === "PENDIENTE"
                            ? "bg-yellow-100 text-yellow-800"
                            : cita.estado === "CONFIRMADA"
                            ? "bg-green-100 text-green-800"
                            : cita.estado === "COMPLETADA"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {cita.estado}
                      </span>
                    </div>

                    {/* Botones de acción */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleFinalizarCita(cita.id)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
                      >
                        Completar
                      </button>
                      <button
                        onClick={() => handleCancelarCita(cita.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No hay citas.</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Tarjeta 2 - Servicios */}
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Servicios
                </h2>
                <p className="text-gray-600">
                  {serviciosActivos} servicios activos.
                </p>
              </div>
              <Button
                onClick={() => router.push("/servicios/agregar")}
                className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Agregar servicio
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 h-[600px]">
            <div className="p-4 space-y-4">
              {servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-black">
                        {servicio.nombre}
                      </h3>
                      {/* Badge de estado */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          servicio.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {servicio.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>

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

                    <button
                      onClick={() =>
                        router.push(
                          `/servicios/${servicio.id}/editar`
                        )
                      }
                      className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      Editar
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
