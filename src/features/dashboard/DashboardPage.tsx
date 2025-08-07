import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";

import { useTheme } from "@mui/material/styles";

import { getDashboardData } from "./dashboardService";
import LogoImage from "../../components/LogoImagen";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { setDashboardData } from "../../store/slices/dashboardSlice";

const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.dashboard.data);
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
        if (dashboardData) {
          dispatch(setDashboardData(dashboardData));
          setDashboardData(dashboardData);
        }
      } catch {
        setError("No se pudo cargar la información del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token, dispatch]);

  theme.palette.primary.main =
    data?.colorPrimario || theme.palette.primary.main;
  theme.typography.fontFamily =
    data?.fuentePersonalizada || theme.typography.fontFamily;

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  return (
    <Box fontFamily={theme.typography.fontFamily} px={3} py={4}>
      {/* Header */}
      <Box
        component="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box display="flex" alignItems="center">
          <LogoImage src={data?.logoUrl} alt="Logo empresa" />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              ml: 2,
              fontWeight: "bold",
            }}
          >
            {data?.nombreComercial}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <SectionHeader
              title="Información del usuario"
              color={theme.palette.primary.main}
            />
            <Typography>
              <strong>Nombre:</strong> {data?.nombreUsuario}{" "}
              {data?.apellidoUsuario}
            </Typography>
            <Typography>
              <strong>Usuario:</strong> {data?.username}
            </Typography>
            <Typography>
              <strong>Rol:</strong> {data?.rolId}
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
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <SectionHeader
              title="Información de la empresa"
              color={theme.palette.primary.main}
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
