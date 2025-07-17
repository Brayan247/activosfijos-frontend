import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import LogoImage from "./LogoImagen";

interface DashboardDto {
  usuarioId: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  rolId: number;
  idiomaPreferido: string;
  username: string;
  ultimoLogin: string | null;
  ipUltimoLogin: string | null;
  empresaId: number;
  nombreComercial: string;
  colorPrimario?: string;
  colorSecundario?: string;
  logoUrl?: string;
  temaOscuro?: boolean;
  fuentePersonalizada?: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setData(response.data);
      } catch {
        setError("No se pudo cargar la información del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const isDark = data?.temaOscuro === true;
  const backgroundColor = isDark ? "#121212" : "#f5f5f5";
  const textColor = isDark ? "#eee" : "#333";
  const cardBackground = isDark ? "#1e1e1e" : "#fff";

  const primaryColor = data?.colorPrimario || "#007bff";
  const secondaryColor = data?.colorSecundario || "#6c757d";
  const fontFamily = data?.fuentePersonalizada || "Segoe UI, sans-serif";

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        fontFamily,
        minHeight: "100vh",
        padding: "2rem",
        transition: "all 0.3s ease",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <LogoImage src={data?.logoUrl} alt="Logo empresa" />
          <h1 style={{ color: primaryColor, marginLeft: "1rem" }}>
            Panel principal
          </h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: primaryColor,
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Información de usuario */}
        <section
          style={{
            backgroundColor: cardBackground,
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: 8,
              marginBottom: "1rem",
            }}
          >
            Información del usuario
          </h3>
          <p><strong>Nombre:</strong> {data?.nombreUsuario} {data?.apellidoUsuario}</p>
          <p><strong>Usuario:</strong> {data?.username}</p>
          <p><strong>Rol ID:</strong> {data?.rolId}</p>
          <p><strong>Idioma:</strong> {data?.idiomaPreferido}</p>
          <p><strong>Último login:</strong> {data?.ultimoLogin || "Nunca"}</p>
          <p><strong>IP:</strong> {data?.ipUltimoLogin || "No disponible"}</p>
        </section>

        {/* Información de empresa */}
        <section
          style={{
            backgroundColor: cardBackground,
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: 8,
              marginBottom: "1rem",
            }}
          >
            Información de la empresa
          </h3>
          <p><strong>Nombre comercial:</strong> {data?.nombreComercial}</p>
          <p><strong>ID Empresa:</strong> {data?.empresaId}</p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
