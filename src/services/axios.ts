import axios from 'axios';

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

const api = axios.create({
  baseURL: 'https://localhost:7150/api',
});

api.interceptors.request.use(config => {
  if (authToken){
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redireccionar al login si el token no es válido
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
