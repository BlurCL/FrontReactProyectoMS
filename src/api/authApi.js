// src/api/authApi.js
import { API_BASE_URL } from "./config";

const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;

export async function loginApi(email, password) {
  const resp = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  console.log("LOGIN status:", resp.status);

  if (!resp.ok) {
    throw new Error("Credenciales inválidas o error en el servidor");
  }

  return await resp.json();
}

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

  return await resp.json();
}
