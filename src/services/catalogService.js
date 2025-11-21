// src/services/catalogService.js
const API_BASE_URL = "http://localhost:8080";

// GET /api/productos
export async function getProductos() {
  const response = await fetch(`${API_BASE_URL}/api/productos`);
  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }
  return response.json();
}
