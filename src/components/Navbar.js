// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { items } = useCarrito();
  const cantidadTotal = items.reduce((acc, it) => acc + it.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Pastelería Mil Sabores🍰
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#">
                Nosotros
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#">
                Contacto
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/catalogo-api">
                Catálogo
              </Link>
            </li>

            {/* Carrito con cantidad */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}
              </Link>
            </li>

            {/* 👇 Nuevo acceso privado para funcionarios */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Acceso funcionario
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
