// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import RecetaEnamorados from "./Recetas/RecetaEnamorados";
import RecetaChocolate from "./Recetas/RecetaChocolate";
import RecetaPremium from "./Recetas/RecetaPremium";

import Registrarse from "./Paginas/Registrarse";
import Catalogo from "./Paginas/Catalogo";
import Home from "./Paginas/Home";
import Catalogoconapi from "./Paginas/catalogoconapi";
import Carrito from "./Paginas/Carrito";

// páginas admin
import AdminLogin from "./Paginas/AdminLogin";
import AdminDashboard from "./Paginas/AdminDashboard";

// contextos
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

// rutas protegidas
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Navbar />

          <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo-api" element={<Catalogoconapi />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/receta-enamorados" element={<RecetaEnamorados />} />
            <Route path="/receta-chocolate" element={<RecetaChocolate />} />
            <Route path="/receta-premium" element={<RecetaPremium />} />

            {/* Login admin (pública) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* RUTAS PRIVADAS (solo admin) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Si quisieras una URL extra para lo mismo: */}
            {/*
            <Route
              path="/admin/productos"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            */}

            {/* 404 simple */}
            <Route path="*" element={<p>Página no encontrada</p>} />
          </Routes>

          <Footer />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
