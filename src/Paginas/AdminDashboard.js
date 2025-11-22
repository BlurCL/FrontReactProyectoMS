import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { crearProducto } from "../api/productosApi";
import { getPedidos } from "../api/orderApi";

function AdminDashboard() {
  const { user } = useAuth();

  // Form producto (sin código)
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [msgProducto, setMsgProducto] = useState("");

  // Producto más vendido
  const [topProducto, setTopProducto] = useState(null);
  const [errorTop, setErrorTop] = useState("");

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    setMsgProducto("");

    try {
      // 👇 solo los campos que usa el backend
      await crearProducto({
        nombre,
        descripcion,
        precio,
        categoriaId,
      });

      setMsgProducto("✅ Producto creado correctamente");

      // limpiar form
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoriaId("");
    } catch (err) {
      console.error(err);
      setMsgProducto("❌ Error al crear el producto");
    }
  };

  // Calcular producto más vendido desde ms-order
  useEffect(() => {
    const fetchTopProducto = async () => {
      try {
        const pedidos = await getPedidos();

        const contador = {}; // idProducto -> { nombre, cantidadTotal }

        pedidos.forEach((p) => {
          (p.detalles || []).forEach((d) => {
            const id = d.idProducto;
            if (!id) return;

            if (!contador[id]) {
              contador[id] = {
                idProducto: id,
                nombre: d.nombreProducto,
                cantidad: 0,
              };
            }
            contador[id].cantidad += d.cantidad || 0;
          });
        });

        const lista = Object.values(contador);
        if (lista.length === 0) {
          setTopProducto(null);
          return;
        }

        lista.sort((a, b) => b.cantidad - a.cantidad);
        setTopProducto(lista[0]);
      } catch (err) {
        console.error(err);
        setErrorTop("No se pudo obtener el producto más vendido");
      }
    };

    fetchTopProducto();
  }, []);

  return (
    <div className="catalogo-wrapper">
      <h2 className="catalogo-titulo">Panel administrador</h2>

      <p>
        Bienvenido <strong>{user?.email || "Administrador"}</strong>
      </p>

      {/* Crear producto */}
      <section
        style={{
          marginTop: "20px",
          padding: "16px",
          border: "1px solid #e0c4a3",
          borderRadius: "10px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h4>Agregar nuevo producto</h4>

        {msgProducto && (
          <div style={{ margin: "8px 0", fontSize: "0.9rem" }}>
            {msgProducto}
          </div>
        )}

        <form onSubmit={handleCrearProducto}>
          <div className="mb-2">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">ID Categoría</label>
            <input
              type="number"
              className="form-control"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-agregar"
            style={{ marginTop: "8px" }}
          >
            Guardar producto
          </button>
        </form>
      </section>

      {/* Producto más vendido */}
      <section
        style={{
          marginTop: "24px",
          padding: "16px",
          border: "1px solid #e0c4a3",
          borderRadius: "10px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h4>Producto más vendido</h4>

        {errorTop && <p>{errorTop}</p>}

        {!errorTop && !topProducto && <p>No hay datos suficientes aún.</p>}

        {topProducto && (
          <div style={{ marginTop: "8px" }}>
            <p>
              <strong>{topProducto.nombre}</strong>
            </p>
            <p>
              Total unidades vendidas:{" "}
              <strong>{topProducto.cantidad}</strong>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
