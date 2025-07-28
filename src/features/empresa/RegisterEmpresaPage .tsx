import { Box, Typography, Paper, useTheme } from "@mui/material";
import EmpresaRegisterForm from "./components/EmpresaRegisterForm";

const RegisterEmpresaPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.default,
        py: { xs: 4, md: 8 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 1000,
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <Box mb={4}>
          <Typography
            variant="h4"
            align="center"
            color="primary"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              mb: 1,
            }}
          >
            Registrar Empresa
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Completa los campos requeridos para registrar tu empresa
          </Typography>
        </Box>
        <EmpresaRegisterForm />
      </Paper>
    </Box>
  );
};

export default RegisterEmpresaPage;
