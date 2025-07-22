import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { getDashboardData } from "./dashboardService";
import LogoImage from "../../components/LogoImagen";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { theme } from "../../style/theme";

import { Box, Typography, Button, Grid, Paper } from "@mui/material";

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

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Cargando datos...</Typography>
      </Box>
    );
  if (error)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  const isDark = data?.temaOscuro === true;
  const backgroundColor = isDark ? theme.colors.darkBg : "#f5f5f5";
  const textColor = isDark ? theme.colors.textLight : theme.colors.textDark;

  const primaryColor = data?.colorPrimario || theme.colors.primary;
  const fontFamily = data?.fuentePersonalizada || theme.font.default;

  return (
    <Box
      sx={{
        backgroundColor,
        color: textColor,
        fontFamily,
        minHeight: "100vh",
        p: 4,
        transition: "all 0.3s ease",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoImage src={data?.logoUrl} alt="Logo empresa" />
          <Typography
            variant="h4"
            sx={{ color: primaryColor, ml: 2, fontWeight: "bold" }}
          >
            Panel principal
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: primaryColor,
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: primaryColor,
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Box>

      <Grid container spacing={4} size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, bgcolor: isDark ? "#333" : "#fff" }} elevation={3}>
          <SectionHeader title="Información del usuario" color={primaryColor} />
          <Typography>
            <strong>Nombre:</strong> {data?.nombreUsuario}{" "}
            {data?.apellidoUsuario}
          </Typography>
          <Typography>
            <strong>Usuario:</strong> {data?.username}
          </Typography>
          <Typography>
            <strong>Rol ID:</strong> {data?.rolId}
          </Typography>
          <Typography>
            <strong>Idioma:</strong> {data?.idiomaPreferido}
          </Typography>
          <Typography>
            <strong>Último login:</strong> {data?.ultimoLogin || "Nunca"}
          </Typography>
          <Typography>
            <strong>IP:</strong> {data?.ipUltimoLogin || "No disponible"}
          </Typography>
        </Paper>

        <Grid container spacing={4} size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: isDark ? "#333" : "#fff" }} elevation={3}>
            <SectionHeader
              title="Información de la empresa"
              color={primaryColor}
            />
            <Typography>
              <strong>Nombre comercial:</strong> {data?.nombreComercial}
            </Typography>
            <Typography>
              <strong>ID Empresa:</strong> {data?.empresaId}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
