import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

// Valores por defecto (los mismos que el dashboard si no hay configuración aún)
const defaultPrimaryColor = "#007bff";
const defaultSecondaryColor = "#6c757d";
const defaultIsDark = false;
const defaultFontFamily = "Arial, sans-serif";

const LoginPage = () => {
  const navigate = useNavigate();
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
      const response = await api.post("/auth/login", credentials);
      const token = response.data.datos.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        const message = response.data.mensaje;
        setError(message);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.mensaje || err.response?.data || "Error de conexión.";
      setError(message);
    }
  };

  // Estilos unificados
  const backgroundColor = defaultIsDark ? "#121212" : "#fff";
  const textColor = defaultIsDark ? "#eee" : "#000";

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color: textColor,
        fontFamily: defaultFontFamily,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: defaultIsDark ? "#1e1e1e" : "#f9f9f9",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            color: defaultPrimaryColor,
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={credentials.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Iniciar sesión
          </button>
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

// Estilos de elementos reutilizables
const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outlineColor: defaultPrimaryColor,
  width: "100%",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: defaultPrimaryColor,
  color: "#fff",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  width: "100%",
  transition: "background 0.3s ease",
};

export default LoginPage;
