import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";

import { useTheme } from "@mui/material/styles";

import { getDashboardData } from "./dashboardService";

import ActivoFijoForm from "../activoFijo/ActivoFijoForm";

import { Box, Typography, CircularProgress } from "@mui/material";
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
    <Box fontFamily={theme.typography.fontFamily} p={2}>
      <ActivoFijoForm />
    </Box>
  );
};

export default DashboardPage;
