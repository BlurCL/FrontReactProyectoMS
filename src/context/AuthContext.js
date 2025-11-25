import { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../api/authApi";

const AuthContext = createContext();
const STORAGE_KEY = "auth_pasteleria";

function saveAuthToStorage(user, token) {
  const data = { user, token };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

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

function clearAuthFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export const AuthProvider = ({ children }) => {
  const [{ user, token }, setAuthState] = useState(() => loadAuthFromStorage());
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const { user: storedUser, token: storedToken } = loadAuthFromStorage();

    if (storedToken) {
      setAuthState({ user: storedUser, token: storedToken });
    } else {
      setAuthState({ user: null, token: null });
      clearAuthFromStorage();
    }
  }, []);

  const login = async (email, password) => {
    setCargando(true);
    try {
      const data = await loginApi(email, password);
      const jwt =
        data.token || data.jwt || data.accessToken || data.access_token;

      const authUser = {
        email: data.email || email,
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


export const useAuth = () => useContext(AuthContext);
