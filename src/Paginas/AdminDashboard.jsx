// src/Paginas/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPedidos } from "../api/orderApi";
import AdminProductos from "./AdminProductos";
import AdminCategorias from "./AdminCategorias";
import AdminOrdenes from "./AdminOrdenes";
import AdminFacturas from "./AdminFacturas";
import AdminEnvios from "./AdminEnvios";

function AdminDashboard() {
  const { user, token } = useAuth();

  const [tabActiva, setTabActiva] = useState("productos");
  const [pedidos, setPedidos] = useState([]);
  const [errorPedidos, setErrorPedidos] = useState("");

  // Ejemplo: si AdminOrdenes usa los pedidos desde aquí
  useEffect(() => {
    const fetchPedidos = async () => {
      setErrorPedidos("");
      try {
        const data = await getPedidos(token);   // 👈 ahora con token
        setPedidos(data || []);
      } catch (e) {
        console.error(e);
        setErrorPedidos("Error al cargar órdenes");
      }
    };

    if (token) {
      fetchPedidos();
    }
  }, [token]);

  return (
    <div className="admin-layout">
      <h1 className="admin-title">Panel administrador</h1>
      <p>Bienvenido {user?.nombre} ({user?.rol})</p>

      {/* tus tabs */}
      <div className="admin-tabs">
        <button
          className={tabActiva === "productos" ? "tab tab-active" : "tab"}
          onClick={() => setTabActiva("productos")}
        >
          Productos
        </button>
        <button
          className={tabActiva === "categorias" ? "tab tab-active" : "tab"}
          onClick={() => setTabActiva("categorias")}
        >
          Categorías
        </button>
        <button
          className={tabActiva === "ordenes" ? "tab tab-active" : "tab"}
          onClick={() => setTabActiva("ordenes")}
        >
          Órdenes
        </button>
        <button
          className={tabActiva === "facturas" ? "tab tab-active" : "tab"}
          onClick={() => setTabActiva("facturas")}
        >
          Facturas
        </button>
        <button
          className={tabActiva === "envios" ? "tab tab-active" : "tab"}
          onClick={() => setTabActiva("envios")}
        >
          Envíos
        </button>
      </div>

      {/* contenido según tab */}
      {tabActiva === "productos" && <AdminProductos />}
      {tabActiva === "categorias" && <AdminCategorias />}
      {tabActiva === "ordenes" && (
        <AdminOrdenes pedidos={pedidos} errorPedidos={errorPedidos} />
      )}
      {tabActiva === "facturas" && <AdminFacturas />}
      {tabActiva === "envios" && <AdminEnvios />}
    </div>
  );
}

export default AdminDashboard;
