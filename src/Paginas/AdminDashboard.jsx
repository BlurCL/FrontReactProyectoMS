// src/Paginas/AdminDashboard.jsx
import React, { useState } from "react";

import AdminProductos from "./AdminProductos";
import AdminCategorias from "./AdminCategorias";   // 👈 NUEVO
import AdminOrdenes from "./AdminOrdenes";
import AdminFacturas from "./AdminFacturas";
import AdminEnvios from "./AdminEnvios";

export default function AdminDashboard() {
  const [seccion, setSeccion] = useState("productos");

  return (
    <div className="admin-layout">
      <h1 className="admin-title">Panel administrador</h1>

      {/* Pestañas principales */}
      <nav className="admin-tabs">
        <button
          className={`tab ${seccion === "productos" ? "tab-activa" : ""}`}
          onClick={() => setSeccion("productos")}
        >
          Productos
        </button>

        <button
          className={`tab ${seccion === "categorias" ? "tab-activa" : ""}`}
          onClick={() => setSeccion("categorias")}
        >
          Categorías
        </button>

        <button
          className={`tab ${seccion === "ordenes" ? "tab-activa" : ""}`}
          onClick={() => setSeccion("ordenes")}
        >
          Órdenes
        </button>

        <button
          className={`tab ${seccion === "facturas" ? "tab-activa" : ""}`}
          onClick={() => setSeccion("facturas")}
        >
          Facturas
        </button>

        <button
          className={`tab ${seccion === "envios" ? "tab-activa" : ""}`}
          onClick={() => setSeccion("envios")}
        >
          Envíos
        </button>
      </nav>

      {/* Contenido según pestaña */}
      <div className="admin-content">
        {seccion === "productos" && <AdminProductos />}
        {seccion === "categorias" && <AdminCategorias />}   {/* 👈 NUEVO */}
        {seccion === "ordenes" && <AdminOrdenes />}
        {seccion === "facturas" && <AdminFacturas />}
        {seccion === "envios" && <AdminEnvios />}
      </div>
    </div>
  );
}
