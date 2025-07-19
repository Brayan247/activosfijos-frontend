import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setAuthToken } from "../../services/axios";

import { login } from "./authService";
import TextInput from "../../components/Input/TextInput";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { theme } from "../../style/theme";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await login(credentials)

      if (token) {
        dispatch(setToken(token));
        setAuthToken(token);
        navigate("/dashboard");
      } 
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error de conexión.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.lightBg,
        color: theme.colors.textLight,
        fontFamily: theme.font.default,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            color: theme.colors.primary,
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <TextInput name="username" placeholder="Usuario" value={credentials.username} onChange={handleChange} />
          <TextInput name="password" type="password" placeholder="Contraseña" value={credentials.password} onChange={handleChange} />
          <PrimaryButton type="submit">Iniciar sesión</PrimaryButton>
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
