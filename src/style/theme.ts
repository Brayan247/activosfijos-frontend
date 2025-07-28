// theme.ts
import { createTheme } from "@mui/material/styles";
import colors from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: typeof colors.dark; // Cambia aquí según tema
  }
  interface PaletteOptions {
    customColors?: typeof colors.dark;
  }
}

const createCustomTheme = (mode: "dark" | "light") => {
  const themeColors = mode === "dark" ? colors.dark : colors.light;

  return createTheme({
    palette: {
      mode,
      background: {
        default: themeColors.background.default,
        paper: themeColors.background.paper,
      },
      primary: {
        main: themeColors.primary,
        light: themeColors.primaryLight,
      },
      secondary: {
        main: themeColors.success,
      },
      error: {
        main: themeColors.error,
      },
      text: {
        primary: themeColors.text.primary,
        secondary: themeColors.text.secondary,
      },
      divider: themeColors.divider,
      customColors: themeColors,
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      allVariants: {
        color: themeColors.text.primary,
      },
    },
  });
};

const DarkTheme = createCustomTheme("dark");
const LightTheme = createCustomTheme("light");

export { DarkTheme, LightTheme };
