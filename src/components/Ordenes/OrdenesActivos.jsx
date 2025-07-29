import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { getDashboardData } from "../../features/dashboard/dashboardService";

const OrdenesActivos = () => {
  const [cabecera, setCabecera] = useState({
    usuario: "",
    observacion: "",
    referencia: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const [activos, setActivos] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await getDashboardData();
        setCabecera((prev) => ({
          ...prev,
          usuario: (data.nombreUsuario || "") + " " + (data.apellidoUsuario || ""),
        }));
      } catch (error) {
        console.error("Error cargando data del dashboard", error);
      }
    }
    cargarDatos();
  }, []);

  const handleCabeceraChange = (e) => {
    setCabecera({ ...cabecera, [e.target.name]: e.target.value });
  };

  const handleAgregarActivo = () => {
    setActivos([
      ...activos,
      {
        cod_barras: "",
        rubro: "",
        item: "",
        denominacion: "",
        descripcion: "",
        valor_historico: "",
        valor_actual: "",
        tipo_vida_util_id: "",
        porcentaje_depreciacion: "",
      },
    ]);
  };

  const handleEliminarActivo = (index) => {
    const nuevos = activos.filter((_, i) => i !== index);
    setActivos(nuevos);
  };

  const handleRegistrarOrden = () => {
    const ordenCompleta = {
      ...cabecera,
      fecha: new Date().toISOString(),
      activos,
    };
    console.log("Orden registrada:", ordenCompleta);
    // Aquí se haría un POST a tu backend
  };

  return (
    <Box sx={{ mx: "auto", maxWidth: "1000px", p: 2 }}>
      <Card elevation={1}>
        <CardHeader
          title="Orden de Activos"
          sx={{
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            py: 1.5,
            px: 2,
          }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Usuario"
                name="usuario"
                fullWidth
                value={cabecera.usuario}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha"
                name="fecha"
                type="date"
                fullWidth
                value={cabecera.fecha}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Referencia"
                name="referencia"
                fullWidth
                value={cabecera.referencia}
                onChange={handleCabeceraChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                name="observacion"
                fullWidth
                multiline
                rows={3}
                value={cabecera.observacion}
                onChange={handleCabeceraChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Detalle de Activos
        </Typography>
        <Table component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Rubro</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Denominación</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Valor Hist.</TableCell>
              <TableCell>Valor Act.</TableCell>
              <TableCell>Vida Útil</TableCell>
              <TableCell>% Dep.</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activos.map((activo, index) => (
              <TableRow key={index}>
                {[
                  "cod_barras",
                  "rubro",
                  "item",
                  "denominacion",
                  "descripcion",
                  "valor_historico",
                  "valor_actual",
                  "tipo_vida_util_id",
                  "porcentaje_depreciacion",
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={activo[field]}
                      onChange={(e) => {
                        const nuevos = [...activos];
                        nuevos[index][field] = e.target.value;
                        setActivos(nuevos);
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleEliminarActivo(index)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAgregarActivo}
            sx={{ borderRadius: 2 }}
          >
            Agregar Activo
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 4, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegistrarOrden}
          sx={{ borderRadius: 2 }}
        >
          Registrar Orden
        </Button>
      </Box>
    </Box>
  );
};

export default OrdenesActivos;
