// src/api/apiClient.js
import axios from "axios";
import { API_BASE_URL } from "./config";

// Cliente axios apuntando al API Gateway
const apiClient = axios.create({
  baseURL: API_BASE_URL, // "http://localhost:8080"
});

// Interceptor para agregar el token JWT si existe
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
