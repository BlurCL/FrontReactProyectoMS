import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">Pastelería Mil Sabores🍰</Link>
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
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="#">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrarse">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
