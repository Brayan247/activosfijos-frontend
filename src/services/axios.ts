import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7150/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
