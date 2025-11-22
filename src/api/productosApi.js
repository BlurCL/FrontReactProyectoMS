import { API_BASE_URL } from "./config";

// 👉 Obtener productos
export async function getProductos() {
  const response = await fetch(`${API_BASE_URL}/api/productos`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json(); // debe devolver un array de productos
}

// 👉 Crear producto nuevo (ms-catalog)
export async function crearProducto(producto) {
  const resp = await fetch(`${API_BASE_URL}/api/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!resp.ok) {
    throw new Error("Error al crear producto");
  }

  return await resp.json();
}
