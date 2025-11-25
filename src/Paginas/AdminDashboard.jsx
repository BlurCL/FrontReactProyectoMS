import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { crearProducto } from "../api/productosApi";
import { getPedidos } from "../api/orderApi";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const { usuario } = useAuth();

  // Formulario producto
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
      await crearProducto({
        nombre,
        descripcion,
        // opcional: convertir a número antes de enviar
        precio: parseFloat(precio),
        categoriaId: categoriaId ? parseInt(categoriaId, 10) : null,
      });

      setMsgProducto("✅ Producto creado correctamente");

      // limpiar formulario
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
    <div>
      <h2>Panel administrador</h2>

      <p>
        Bienvenido{" "}
        <strong>{usuario?.email || "Administrador"}</strong>
      </p>

      {/* Crear producto */}
      <section>
        <h4>Agregar nuevo producto</h4>

        {msgProducto && <p>{msgProducto}</p>}

        <form onSubmit={handleCrearProducto}>
          <div>
            <label>Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label>Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
            />
          </div>

          <div>
            <label>ID Categoría</label>
            <input
              type="number"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            />
          </div>

          <button type="submit">
            Guardar producto
          </button>
        </form>
      </section>

      {/* Producto más vendido */}
      <section>
        <h4>Producto más vendido</h4>

        {errorTop && <p>{errorTop}</p>}

        {!errorTop && !topProducto && (
          <p>No hay datos suficientes aún.</p>
        )}

        {topProducto && (
          <div>
            <p>
              <strong>{topProducto.nombre}</strong>
            </p>
            <p>
              Total de unidades vendidas:{" "}
              <strong>{topProducto.cantidad}</strong>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
