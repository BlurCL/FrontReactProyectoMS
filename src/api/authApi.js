// src/api/authApi.js

const AUTH_BASE_URL = "http://localhost:8083/api/auth";

/**
 * Login de usuario (admin / trabajador).
 * Espera que el backend valide y devuelva algún tipo de token + datos del usuario.
 *
 * Body que se envía:
 * {
 *   "email": "admin2@pasteleria.cl",
 *   "password": "123456"
 * }
 */
export async function loginApi(email, password) {
  const resp = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    // aquí puedes leer resp.status para mensajes más específicos si quieres
    throw new Error("Credenciales inválidas o error en el servidor");
  }

  const data = await resp.json();
  return data; // { token, email, rol, ... } (ajustamos luego según tu backend)
}

/**
 * Registro opcional (por si lo necesitas desde el front).
 * No lo estamos usando aún, pero queda listo.
 */
export async function registerApi(usuario) {
  const resp = await fetch(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!resp.ok) {
    throw new Error("Error al registrar usuario");
  }

  const data = await resp.json();
  return data;
}
