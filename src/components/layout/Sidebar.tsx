import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Toolbar,
  Collapse,
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../features/dashboard/dashboardService";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const drawerWidth = 200;

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

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleOrdersClick = () => setOpenOrders((prev) => !prev);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/dashboard" },
  ];

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

  // Expandir menú de órdenes si la ruta coincide
  useEffect(() => {
    if (location.pathname.includes("/dashboard/ordenes")) {
      setOpenOrders(true);
    }
  }, [location.pathname]);

  const rolesMap: Record<number, string> = {
    1: "SuperAdmin",
    2: "Admin",
    3: "Soporte",
    4: "Usuario",
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
    handleMenuClose();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          border: "none",
          pt: 1,
        },
      }}
    >
      <Toolbar />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ px: 2 }}>
          {error}
        </Typography>
      ) : (
        <List dense>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
              sx={{
                px: 2,
                py: 1,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                },
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{ minWidth: 32, color: theme.palette.text.primary }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          ))}

          <ListItemButton
            onClick={handleOrdersClick}
            sx={{ px: 2, py: 1 }}
            selected={location.pathname.includes("/dashboard/ordenes")}
          >
            <ListItemIcon
              sx={{ minWidth: 32, color: theme.palette.text.primary }}
            >
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Órdenes"
              primaryTypographyProps={{ fontSize: 14 }}
            />
            {openOrders ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openOrders} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              <ListItemButton
                sx={{ pl: 4, py: 0.75 }}
                selected={isActive("/dashboard/ordenes")}
                onClick={() => navigate("/dashboard/ordenes")}
              >
                <ListItemIcon
                  sx={{ minWidth: 32, color: theme.palette.text.primary }}
                >
                  <AddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Nueva orden"
                  primaryTypographyProps={{ fontSize: 13 }}
                />
              </ListItemButton>
              {(data?.rolId === 2 &&
              <ListItemButton
                sx={{ pl: 4, py: 0.75 }}
                selected={isActive("/dashboard/ordenes/verificacion")}
                onClick={() => navigate("/dashboard/ordenes/verificacion")}
              >
                <ListItemIcon
                  sx={{ minWidth: 32, color: theme.palette.text.primary }}
                >
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Verificación"
                  primaryTypographyProps={{ fontSize: 13 }}
                />
              </ListItemButton>
              )}

              <ListItemButton
                sx={{ pl: 4, py: 0.75 }}
                selected={isActive("/dashboard/ordenes/aprobadas")}
                onClick={() => navigate("/dashboard/ordenes/aprobadas")}
              >
                <ListItemIcon
                  sx={{ minWidth: 32, color: theme.palette.text.primary }}
                >
                  <DoneAllIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Aprobadas"
                  primaryTypographyProps={{ fontSize: 13 }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      )}

      {/* Pie con info de usuario y opciones */}
      {!loading && data && (
        <Box
          sx={{
            mt: "auto",
            px: 2,
            py: 1.5,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
            {`${data.nombreUsuario?.[0] || ""}${
              data.apellidoUsuario?.[0] || ""
            }`.toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" fontWeight={500} noWrap>
              {`${data.nombreUsuario || "Usuario"} ${
                data.apellidoUsuario || ""
              }`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {rolesMap[data.rolId] || "Desconocido"}
            </Typography>
          </Box>

          {/* Menú del usuario */}
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} disabled>Ver perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;
