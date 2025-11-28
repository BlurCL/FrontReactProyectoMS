// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import RecetaEnamorados from "./Recetas/RecetaEnamorados";
import RecetaChocolate from "./Recetas/RecetaChocolate";
import RecetaPremium from "./Recetas/RecetaPremium";

import Catalogo from "./Paginas/Catalogo";
import Home from "./Paginas/Home";
import Carrito from "./Paginas/Carrito";

import AdminLogin from "./Paginas/AdminLogin";
import AdminDashboard from "./Paginas/AdminDashboard";

// ⬇️ NUEVO: Portal del trabajador
import TrabajadorDashboard from "./Paginas/TrabajadorDashboard";

import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Navbar />

          <Routes>
            {/* 🌎 RUTAS PÚBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogo-api" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/receta-enamorados" element={<RecetaEnamorados />} />
            <Route path="/receta-chocolate" element={<RecetaChocolate />} />
            <Route path="/receta-premium" element={<RecetaPremium />} />

            {/* 🔐 LOGIN (público para admin y trabajador) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 🔒 PANEL ADMIN (solo administrador) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute /* admin-only (comportamiento por defecto) */>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🧁 PANEL TRABAJADOR (solo rol TRABAJADOR) */}
            <Route
              path="/trabajador"
              element={
                <ProtectedRoute requiredRole="TRABAJADOR">
                  <TrabajadorDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<p>Página no encontrada</p>} />
          </Routes>

          <Footer />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
