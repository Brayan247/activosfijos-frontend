import { Box, Typography } from "@mui/material";
import EmpresaRegisterForm from "./forms/EmpresaRegisterForm";

const RegisterEmpresaPage = () => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        py: 2,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "white",
          p: 6,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Registrar Empresa
        </Typography>
        <EmpresaRegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterEmpresaPage;
