// src/api/apiClient.js
import axios from "axios";
import { API_BASE_URL } from "./config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 👇 interceptor: mete el JWT en Authorization si existe en localStorage
apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth_pasteleria");
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // si falla el parseo, seguimos sin romper nada
  }
  return config;
});

export default apiClient;
