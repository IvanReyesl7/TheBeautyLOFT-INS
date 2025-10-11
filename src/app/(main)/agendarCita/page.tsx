"use client";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addMonths, startOfToday } from "date-fns";
import { Inter, Cormorant_Garamond } from "next/font/google";

// Configurar las fuentes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  duracion: number;
  imagenUrl: string | null;
  activo: boolean;
}

export default function BookingPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setLoading(true);
      }
    }
    fetchServicios();
  }, []);

  const today = startOfToday();
  const nextMonth = addMonths(today, 1);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    servicio: "",
    fecha: today,
    hora: "07:00",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
  });

  const hours = Array.from({ length: 6 }, (_, i) => {
    const h = 7 + i;
    return h.toString().padStart(2, "0") + ":00";
  });

  const validateField = (name: string, value: string | Date) => {
    switch (name) {
      case "nombre":
      case "apellido":
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/.test(value as string)) {
          return "Debe contener al menos 2 letras, solo caracteres válidos.";
        }
        break;
      case "correo":
        if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
            value as string
          )
        ) {
          return "Correo electrónico inválido.";
        }
        break;
      case "telefono":
        if (!/^\d{7,15}$/.test(value as string)) {
          return "Teléfono inválido (7 a 15 dígitos).";
        }
        break;
      case "servicio":
        if (!value) return "Seleccione un servicio.";
        break;
      case "fecha":
        if (!(value instanceof Date)) return "Seleccione una fecha válida.";
        break;
      case "hora":
        if (!value) return "Seleccione una hora.";
        break;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setForm({ ...form, fecha: date });
      setErrors({ ...errors, fecha: validateField("fecha", date) });
    }
  };

  const isFormValid = () =>
    Object.values(errors).every((e) => e === "") &&
    Object.values(form).every((f) => f !== "" && f !== null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!isFormValid()) {
    alert("Por favor corrige los errores antes de enviar.");
    return;
  }


  const servicioSeleccionado = servicios.find(s => s.nombre === form.servicio);
  
  if (!servicioSeleccionado) {
    alert("Servicio no válido");
    return;
  }

  try {
    
    const [horas, minutos] = form.hora.split(':').map(Number);
    const fechaHora = new Date(form.fecha);
    fechaHora.setHours(horas, minutos, 0, 0);

    
    const citaData = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.correo,
      telefono: form.telefono,
      servicioId: servicioSeleccionado.id,
      fechaHora: fechaHora.toISOString(),
      estado: 'PENDIENTE'
    };

    console.log('Enviando datos:', citaData);

    
    const response = await fetch('/api/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citaData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al agendar cita');
    }

    const data = await response.json();
    console.log('Cita creada:', data);

    alert("¡Cita agendada exitosamente! ✅");
    
    
    setForm({
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      servicio: "",
      fecha: today,
      hora: "07:00",
    });

  } catch (error: any) {
    console.error('Error:', error);
    alert(`Error al agendar la cita: ${error.message}`);
  }
};

  const servicioSeleccionado = servicios.find(
    (s) => s.nombre === form.servicio
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1
          className={`${inter.className} text-3xl font-extrabold text-black mb-6 text-center`}
        >
          Agenda tu cita
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nombre */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.nombre ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.apellido ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.correo ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.telefono ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
            )}
          </div>

          {/* Servicio */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Servicio
            </label>
            <select
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.servicio ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </select>
            {errors.servicio && (
              <p className="text-red-500 text-sm mt-1">{errors.servicio}</p>
            )}
          </div>

          {/* Hora */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Hora</label>
            <select
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 bg-[#D9D9D9] border-none rounded-lg focus:ring-2 text-black ${
                errors.hora ? "ring-2 ring-red-500" : "focus:ring-gray-400"
              }`}
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            {errors.hora && (
              <p className="text-red-500 text-sm mt-1">{errors.hora}</p>
            )}
          </div>

          {/* Calendario */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2 text-gray-700">
              Fecha
            </label>
            <DayPicker
              mode="single"
              selected={form.fecha}
              onSelect={handleDateSelect}
              disabled={{ before: today, after: nextMonth }}
              styles={{
                caption: { color: "#000000", fontWeight: "bold" },
                day_selected: { backgroundColor: "#000000", color: "white" },
              }}
            />
            {errors.fecha && (
              <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>
            )}
          </div>

          {/* Vista previa */}
          {isFormValid() && (
            <div className="md:col-span-2 bg-gray-100 border-2 border-gray-300 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-black mb-4">
                Resumen de tu cita
              </h2>
              <div className="space-y-2 text-gray-800">
                <p>
                  <span className="font-semibold text-black">Nombre:</span>{" "}
                  {form.nombre} {form.apellido}
                </p>
                <p>
                  <span className="font-semibold text-black">Correo:</span>{" "}
                  {form.correo}
                </p>
                <p>
                  <span className="font-semibold text-black">Teléfono:</span>{" "}
                  {form.telefono}
                </p>
                <p>
                  <span className="font-semibold text-black">Servicio:</span>{" "}
                  {form.servicio}
                </p>
                <p>
                  <span className="font-semibold text-black">Fecha:</span>{" "}
                  {form.fecha?.toLocaleDateString("es-ES")}
                </p>
                <p>
                  <span className="font-semibold text-black">Hora:</span>{" "}
                  {form.hora}
                </p>
                <p>
                  <span className="font-semibold text-black">Precio:</span> $
                  {servicioSeleccionado
                    ? Number(servicioSeleccionado.precio).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          )}

          {/* Botón */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Confirmar cita
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
