// styles/colors.ts

const darkThemeColors = {
  background: { default: "#0f172a", paper: "#1e293b" },
  text: { primary: "#f8fafc", secondary: "#94a3b8" },
  primary: "#3b82f6",
  primaryLight: "#60a5fa",
  success: "#22c55e",
  error: "#ef4444",
  divider: "#334155",
};

const lightThemeColors = {
  background: { default: "#f4f6f8", paper: "#ffffff" },         // Fondo suave y limpio
  text: { primary: "#1e293b", secondary: "#64748b" },            // Azul grisáceo moderno
  primary: "#3b82f6",                                           // Azul moderno (coherente con dark)
  primaryLight: "#93c5fd",                                      // Azul claro suave
  success: "#10b981",                                           // Verde esmeralda más relajado
  error: "#ef4444",                                             // Rojo suave
  divider: "#e5e7eb",                                           // Gris muy claro para divisores
};

const colors = {
  dark: darkThemeColors,
  light: lightThemeColors,
};

export default colors;
