import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTheme } from "@mui/material/styles";

import { getDashboardData } from "./dashboardService";
import LogoImage from "../../components/LogoImagen";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import api from "../../services/axios";

import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

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
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state: RootState) => state.auth.token);

  const [openModal, setOpenModal] = useState(false);
  const [formActivo, setFormActivo] = useState({
    codBarras: "",
    rubro: "",
    item: "",
    denominacion: "",
    descripcion: "",
    valorHistorico: "",
    valorActual: "",
    tipoVidaUtilId: 0,
    porcentajeDepreciacion: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormActivo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitActivo = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario con fetch o axios
    const dataToSend = {
      ...formActivo,
      empresaId: data?.empresaId,
      usuarioId: data?.usuarioId,
    };
    await api.post("/activo-fijo/registrar", dataToSend);
    handleCloseModal();
  };

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
  const backgroundColor = isDark ? theme.palette.background.default : "#f5f5f5";
  const textColor = isDark ? theme.palette.text.primary : theme.palette.text.secondary;
  const primaryColor = data?.colorPrimario || theme.palette.primary.main;
  const fontFamily = data?.fuentePersonalizada || theme.typography.fontFamily;

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
      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          backgroundColor: primaryColor,
          color: "#fff",
          fontWeight: "bold",
          mb: 2,
          "&:hover": {
            backgroundColor: primaryColor,
          },
        }}
      >
        Registrar Activo
      </Button>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Registrar nuevo activo</DialogTitle>
        <form onSubmit={handleSubmitActivo}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="codBarras"
              label="Código de barras"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="rubro"
              label="Rubro"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="item"
              label="Item"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="denominacion"
              label="Denominación"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="descripcion"
              label="Descripción"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="valorHistorico"
              label="Valor histórico"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="valorActual"
              label="Valor actual"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="tipoVidaUtilId"
              label="Tipo vida útil ID"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="porcentajeDepreciacion"
              label="Porcentaje de depreciación"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: primaryColor }}
            >
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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
