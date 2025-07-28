import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/dashboard" },
    { text: "Ordenes", icon: <AssessmentIcon />, path: "/dashboard" },
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
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {/* Esto asegura que no se solape con el header */}
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
