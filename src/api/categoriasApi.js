import { API_BASE_URL } from "./config";

export async function getCategorias() {
  const response = await fetch(`${API_BASE_URL}/api/categorias`);
  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }
  return response.json();
}

export async function getCategoriaById(id) {
  const response = await fetch(`${API_BASE_URL}/api/categorias/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener categoría");
  }
  return response.json();
}

export async function crearCategoria(categoria) {
  const response = await fetch(`${API_BASE_URL}/api/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    throw new Error("Error al crear categoría");
  }
  return response.json();
}

export async function actualizarCategoria(id, categoria) {
  const response = await fetch(`${API_BASE_URL}/api/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar categoría");
  }
  return response.json();
}

export async function eliminarCategoria(id) {
  const response = await fetch(`${API_BASE_URL}/api/categorias/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar categoría");
  }
}
