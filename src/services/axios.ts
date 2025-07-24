import axios from "axios";

let authToken: string | null = null;
let empresaId: number | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const setEmpresaId = (id: number) => {
  empresaId = id;
};

export const getEmpresaId = () => empresaId;

const api = axios.create({
  baseURL: "https://localhost:7150/api",
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  if (empresaId !== null) {
    config.headers["empresa-id"] = empresaId;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redireccionar al login si el token no es válido
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
