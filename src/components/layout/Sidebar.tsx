import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Toolbar,
  Collapse,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export const drawerWidth = 200;

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);

  const handleOrdersClick = () => setOpenOrders((prev) => !prev);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/dashboard" },
  ];

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
            <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14 }} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={handleOrdersClick}
          sx={{
            px: 2,
            py: 1,
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            },
          }}
          selected={location.pathname.includes("/dashboard/ordenes")}
        >
          <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Órdenes" primaryTypographyProps={{ fontSize: 14 }} />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItemButton
              sx={{ pl: 4, py: 0.75 }}
              selected={isActive("/dashboard/ordenes/nueva")}
              onClick={() => navigate("/dashboard/ordenes/nueva")}
            >
              <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nueva orden" primaryTypographyProps={{ fontSize: 13 }} />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4, py: 0.75 }}
              selected={isActive("/dashboard/ordenes/verificacion")}
              onClick={() => navigate("/dashboard/ordenes/verificacion")}
            >
              <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Verificación" primaryTypographyProps={{ fontSize: 13 }} />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4, py: 0.75 }}
              selected={isActive("/dashboard/ordenes/aprobadas")}
              onClick={() => navigate("/dashboard/ordenes/aprobadas")}
            >
              <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary="Aprobadas" primaryTypographyProps={{ fontSize: 13 }} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
