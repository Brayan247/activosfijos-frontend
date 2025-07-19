import api from "../../services/axios";

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.datos.token;
};
