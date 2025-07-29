import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: 56,
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          minHeight: "unset !important", // elimina altura forzada por defecto
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Inventory2Icon fontSize="small" />
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ fontWeight: 500, fontSize: "1rem" }}
          >
            Activos Fijos
          </Typography>
        </div>
        <IconButton
          onClick={toggleDarkMode}
          color="inherit"
          size="small"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          {isDarkMode ? (
            <DarkModeIcon fontSize="small" />
          ) : (
            <LightModeIcon fontSize="small" />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
