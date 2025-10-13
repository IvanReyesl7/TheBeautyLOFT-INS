"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const validateForm = () => {
    const validationErrors: string[] = [];
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.push("Formato de correo inválido.");
    }
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (attempts >= 5) {
      setErrors(["Demasiados intentos fallidos. Intenta más tarde."]);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors([data.message || "Credenciales inválidas"]);
        setAttempts(attempts + 1);
        return;
      }

      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err) {
      setErrors(["Error al conectar con el servidor"]);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
        {errors.length > 0 && (
          <div className="p-3 rounded-md mb-4 text-sm text-red-600">
            <ul className="list-disc list-inside">
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-200">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}
