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

            {/* Si ya NO quieres el catálogo estático, puedes comentar /catalogo */}
            {/* <Route path="/catalogo" element={<Catalogo />} /> */}

            {/* Catálogo que consume la API */}
            <Route path="/catalogo-api" element={<Catalogo />} />

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
