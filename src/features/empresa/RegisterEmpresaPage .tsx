import { Box, Typography, Paper } from "@mui/material";
import EmpresaRegisterForm from "./components/EmpresaRegisterForm";

const RegisterEmpresaPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #f3f4f6 100%)",
        px: 2,
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
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
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
