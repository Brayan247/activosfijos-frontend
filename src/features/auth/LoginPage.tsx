import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setAuthToken } from "../../services/axios";

import { login } from "./authService";
import { Box, Stack, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TextInput from "../../components/Input/TextInput";
import PrimaryButton from "../../components/Button/PrimaryButton";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await login(credentials);

      if (token) {
        dispatch(setToken(token));
        setAuthToken(token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error de conexión.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#f5f5f5",
        fontFamily: theme.typography.fontFamily,
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          mb={1}
          fontWeight={600}
          color={theme.palette.text.primary}
        >
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextInput
              name="username"
              onChange={handleChange}
              value={credentials.username}
              placeholder="Usuario"
            />
            <TextInput
              name="password"
              type="password"
              onChange={handleChange}
              value={credentials.password}
              placeholder="Contraseña"
            />
            {error && (
              <Typography color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}
            <PrimaryButton type="submit">Iniciar sesion</PrimaryButton>
            <PrimaryButton
              onClick={() => navigate("/register/empresa")}
              variant="outlined"
            >
              Registro
            </PrimaryButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
