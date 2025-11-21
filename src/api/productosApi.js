// src/api/productosApi.js
import { API_BASE_URL } from "./config";

// 👉 ESTE NOMBRE es importante: getProductos
export async function getProductos() {
  const response = await fetch(`${API_BASE_URL}/api/productos`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json(); // debe devolver un array de productos
}
