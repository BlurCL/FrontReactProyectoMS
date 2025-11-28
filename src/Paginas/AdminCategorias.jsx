// src/Paginas/AdminCategorias.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../styles/AdminProductos.css"; // 👈 reutilizamos los mismos estilos

const API_CATEGORIAS = "/api/categorias";

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
  });

  // ===== CARGA INICIAL =====
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const resp = await apiClient.get(API_CATEGORIAS);
      const data = Array.isArray(resp.data)
        ? resp.data
        : Array.isArray(resp.data.content)
        ? resp.data.content
        : Object.values(resp.data || {});

      setCategorias(data);
    } catch (e) {
      console.error("Error al cargar categorías", e);
      setMensaje("Error al cargar categorías");
    }
  };

  // ===== FORM =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarForm = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
    });
    setMensaje("");
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const body = {
        nombreCategoria: form.nombre,
        descripcionCategoria: form.descripcion,
      };

      if (form.id) {
        await apiClient.put(`${API_CATEGORIAS}/${form.id}`, body);
        setMensaje("Categoría actualizada");
      } else {
        await apiClient.post(API_CATEGORIAS, body);
        setMensaje("Categoría creada");
      }

      await cargarCategorias();
      limpiarForm();
    } catch (e) {
      console.error("Error al guardar categoría", e);
      setMensaje("Error al guardar categoría");
    }
  };

  const editarCategoria = (c) => {
    setForm({
      id: c.id,
      nombre: c.nombreCategoria || c.nombre,
      descripcion: c.descripcionCategoria || c.descripcion || "",
    });
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;

    try {
      await apiClient.delete(`${API_CATEGORIAS}/${id}`);
      setMensaje("Categoría eliminada");
      await cargarCategorias();
    } catch (e) {
      console.error("Error al eliminar categoría", e);
      setMensaje("No se pudo eliminar la categoría");
    }
  };

  // ===== RENDER =====
  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Administrar categorías</h2>
        {mensaje && <span className="admin-msg">{mensaje}</span>}
      </div>

      {/* CARD FORM */}
      <div className="admin-card">
        <h3>Agregar nueva categoría</h3>

        <form onSubmit={guardarCategoria} className="admin-form-grid">
          <div className="form-row">
            <div className="form-field">
              <label>Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field full">
              <label>Descripción (opcional)</label>
              <textarea
                name="descripcion"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {form.id ? "Actualizar categoría" : "Guardar categoría"}
            </button>
            {form.id && (
              <button
                type="button"
                className="btn-secondary"
                onClick={limpiarForm}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CARD TABLA */}
      <div className="admin-card">
        <h3>Listado de categorías</h3>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length > 0 ? (
                categorias.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombreCategoria || c.nombre}</td>
                    <td>{c.descripcionCategoria || c.descripcion}</td>
                    <td className="acciones">
                      <button
                        type="button"
                        className="btn-small"
                        onClick={() => editarCategoria(c)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn-small btn-danger"
                        onClick={() => eliminarCategoria(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No hay categorías registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
