import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setAuthToken } from "../../services/axios";

import { login } from "./authService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { theme } from "../../style/theme";

const LoginPage = () => {
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
        backgroundColor: theme.colors.lightBg,
        color: theme.colors.textLight,
        fontFamily: theme.font.default,
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#f9f9f9",
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          mb={3}
          color={theme.colors.primary}
        >
          Iniciar sesión
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Usuario"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register/empresa")}
            sx={{ mt: 2, color: theme.colors.primary, textTransform: "none" }}
          >
            Registro
          </Button>
          {error && (
            <Typography color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
