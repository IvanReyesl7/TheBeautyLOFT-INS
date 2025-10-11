"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const validateForm = () => {
    const validationErrors: string[] = [];

    // Email (formato válido)
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.push("Formato de correo inválido.");
    }

    // Contraseña (mínimo 8 caracteres, mayúscula, número, caracter especial)
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      validationErrors.push(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial."
      );
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulación de intentos fallidos
    if (attempts >= 5) {
      setErrors(["Demasiados intentos fallidos. Intenta más tarde."]);
      return;
    }

    // 🚨 Aquí luego se integrará el backend con MySQL
    if (email === "admin@example.com" && password === "Admin@1234") {
      router.push("/dashboard"); // redirección después del login
    } else {
      setAttempts(attempts + 1);
      setErrors(["Credenciales inválidas"]);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        {errors.length > 0 && (
          <div className={`${inter.className} from-gray-50 to-gray-100 p-3 rounded-md mb-4 text-sm`}>
            <ul className="list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition duration-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}