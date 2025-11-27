// src/Paginas/AdminProductos.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../styles/AdminProductos.css"; // asegúrate que el archivo exista

const API_PRODUCTOS = "/api/productos";
const API_CATEGORIAS = "/api/categorias";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    id: null,
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    idCategoria: "",
  });

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    try {
      const resp = await apiClient.get(API_PRODUCTOS);
      let data = resp.data;
      if (Array.isArray(data)) {
        setProductos(data);
      } else if (Array.isArray(data.content)) {
        setProductos(data.content);
      } else {
        setProductos(Object.values(data || {}));
      }
    } catch (e) {
      console.error("Error al cargar productos", e);
      setMensaje("Error al cargar productos");
    }
  };

  const cargarCategorias = async () => {
    try {
      const resp = await apiClient.get(API_CATEGORIAS);
      let data = resp.data;
      if (Array.isArray(data)) {
        setCategorias(data);
      } else if (Array.isArray(data.content)) {
        setCategorias(data.content);
      } else {
        setCategorias(Object.values(data || {}));
      }
    } catch (e) {
      console.error("Error al cargar categorías", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarForm = () => {
    setForm({
      id: null,
      codigo: "",
      nombre: "",
      descripcion: "",
      precio: "",
      idCategoria: "",
    });
    setMensaje("");
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const body = {
        nombreProducto: form.nombre,
        descripcionProducto: form.descripcion,
        precioProducto: Number(form.precio),
        categoriaId: Number(form.idCategoria),
        codigoProducto: form.codigo || undefined,
      };

      if (form.id) {
        await apiClient.put(`${API_PRODUCTOS}/${form.id}`, body);
        setMensaje("Producto actualizado correctamente");
      } else {
        await apiClient.post(API_PRODUCTOS, body);
        setMensaje("Producto creado correctamente");
      }

      await cargarProductos();
      limpiarForm();
    } catch (e) {
      console.error("Error al guardar producto", e);
      setMensaje("Error al guardar producto");
    }
  };

const editarProducto = (p) => {
  setForm({
    id: p.id,
    codigo: p.codigoProducto === "-" ? "" : p.codigoProducto,
    nombre: p.nombreProducto,
    descripcion: p.descripcionProducto,
    precio: p.precioProducto,
    idCategoria: String(p.categoriaId),
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    try {
      await apiClient.delete(`${API_PRODUCTOS}/${id}`);
      setMensaje("Producto eliminado");
      await cargarProductos();
    } catch (e) {
      console.error("Error al eliminar producto", e);
      setMensaje("No se pudo eliminar el producto");
    }
  };

  const getNombreCategoria = (categoriaId) => {
    const cat = categorias.find((c) => (c.id ?? c.idCategoria) === categoriaId);
    return cat ? cat.nombreCategoria || cat.nombre : categoriaId;
  };

  return (
    <div className="admin-section">
      <div className="admin-header">
        <h2>Administrar productos</h2>
        {mensaje && <span className="admin-msg">{mensaje}</span>}
      </div>

      {/* CARD FORM */}
      <div className="admin-card">
        <h3>Agregar nuevo producto</h3>

        <form onSubmit={guardarProducto} className="admin-form-grid">
          <div className="form-row">
            <div className="form-field">
              <label>Código (opcional)</label>
              <input
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
                placeholder="Opcional"
              />
            </div>

            <div className="form-field">
              <label>Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Precio</label>
              <input
                name="precio"
                type="number"
                min="0"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Categoría</label>
              <select
                name="idCategoria"
                value={form.idCategoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((c) => {
                  const id = c.id ?? c.idCategoria;
                  const nombre = c.nombreCategoria || c.nombre;
                  return (
                    <option key={id} value={id}>
                      {nombre} (ID: {id})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {form.id ? "Actualizar producto" : "Guardar producto"}
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
        <h3>Listado de productos</h3>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productos) && productos.length > 0 ? (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.codigoProducto ?? "-"}</td>
                    <td>{p.nombreProducto}</td>
                    <td>{p.descripcionProducto}</td>
                    <td>{p.precioProducto}</td>
                    <td>{getNombreCategoria(p.categoriaId)}</td>
                    <td className="acciones">
                      <button
                        type="button"
                        className="btn-small"
                        onClick={() => editarProducto(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn-small btn-danger"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-row">
                    No hay productos registrados.
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
