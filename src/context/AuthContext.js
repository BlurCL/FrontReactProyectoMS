import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../api/authApi";

const AuthContext = createContext(null);

const STORAGE_KEY = "auth_pasteleria";

/**
 * Helpers para leer/guardar auth en localStorage.
 * Esto te servirá si luego quieres un isAuthenticated() estilo repo del profe.
 */
function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || null,
      token: parsed.token || null,
    };
  } catch {
    return { user: null, token: null };
  }
}

function saveAuthToStorage(user, token) {
  const data = { user, token };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearAuthFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

// 👉 Export para usar en ProtectedRoute estilo "isAuthenticated()"
export const authStorage = {
  getAuth: loadAuthFromStorage,
  isAuthenticated: () => {
    const { token } = loadAuthFromStorage();
    return !!token;
  },
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [{ user, token }, setAuthState] = useState(() => loadAuthFromStorage());
  const [cargando, setCargando] = useState(false);

  // Por si en el futuro quieres recargar desde storage cuando cambie algo
  useEffect(() => {
    // aquí ahora mismo no hacemos nada más
  }, []);

  const login = async (email, password) => {
    setCargando(true);
    try {
      const data = await loginApi(email, password);

      // Intentamos ser flexibles con el nombre del campo token
      const jwt =
        data.token || data.jwt || data.accessToken || data.access_token;

      const authUser = {
        email: data.email || email,
        // tu backend usa "rol": "ADMINISTRADOR"
        rol: data.rol || data.role || "ADMINISTRADOR",
        nombre: data.nombre || "",
        apellido: data.apellido || "",
      };

      setAuthState({ user: authUser, token: jwt });
      saveAuthToStorage(authUser, jwt);

      return authUser;
    } finally {
      setCargando(false);
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
    clearAuthFromStorage();
  };

  const isAdmin =
    user?.rol === "ADMINISTRADOR" ||
    user?.rol === "ADMIN" ||
    user?.rol === "admin";

  const value = {
    user,
    token,
    isAdmin,
    login,
    logout,
    cargando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
