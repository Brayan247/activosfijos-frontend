import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { getDashboardData } from "./dashboardService";
import LogoImage from "../../components/LogoImagen";
import Card from "../../components/Cards/Card";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { theme } from "../../style/theme";

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
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch {
        setError("No se pudo cargar la información del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const isDark = data?.temaOscuro === true;
  const backgroundColor = isDark ? theme.colors.darkBg : "#f5f5f5";
  const textColor = isDark ? theme.colors.textLight : theme.colors.textDark;

  const primaryColor = data?.colorPrimario || theme.colors.primary;
  const fontFamily = data?.fuentePersonalizada || theme.font.default;

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
        <Card>
          <SectionHeader title="Información del usuario" color={primaryColor} />
          <p><strong>Nombre:</strong> {data?.nombreUsuario} {data?.apellidoUsuario}</p>
          <p><strong>Usuario:</strong> {data?.username}</p>
          <p><strong>Rol ID:</strong> {data?.rolId}</p>
          <p><strong>Idioma:</strong> {data?.idiomaPreferido}</p>
          <p><strong>Último login:</strong> {data?.ultimoLogin || "Nunca"}</p>
          <p><strong>IP:</strong> {data?.ipUltimoLogin || "No disponible"}</p>
        </Card>
        <Card>
          <SectionHeader title="Información de la empresa" color={primaryColor} />
          <p><strong>Nombre comercial:</strong> {data?.nombreComercial}</p>
          <p><strong>ID Empresa:</strong> {data?.empresaId}</p>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
