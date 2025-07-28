import React from "react";
import { useThemeContext } from "../ThemeContext";
import { IconButton, useTheme, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Inventory2Icon from "@mui/icons-material/Inventory2"; // Ícono de activos fijos

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Inventory2Icon />
        <Typography variant="h6" component="h1">
          Activos Fijos
        </Typography>
      </div>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </header>
  );
};

export default Header;
