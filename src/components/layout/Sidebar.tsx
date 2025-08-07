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
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const drawerWidth = 200;

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const data = useSelector((state: RootState) => state.dashboard.data);

  const handleOrdersClick = () => setOpenOrders((prev) => !prev);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/dashboard" },
  ];

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
            {data?.rolId === 2 && (
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
        {data ? (
          <>
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
          </>
        ) : (
          <CircularProgress size={20} />
        )}
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} disabled>
            Ver perfil
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
