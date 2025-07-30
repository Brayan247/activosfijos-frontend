import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const OrdenesActivos = () => {
  const navigate = useNavigate();
  const params = useParams();

  // modo: "nuevo", "editar", "ver"
  const [modo, setModo] = useState("nuevo");

  const [formOrden, setFormOrden] = useState({
    numeroOrden: "",
    tipoOrden: "",
    fecha: "",
    responsable: "",
    estadoOrden: "",
  });
  const [activos, setActivos] = useState([]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    descripcion: "",
    marcaModelo: "",
    serie: "",
    estado: "Activo",
    responsable: "",
    fechaAdquisicion: "",
    valorHistorico: "",
    valorActual: "",
    referencia: "",
    ubicacion: "",
    fechaBaja: "",
    observaciones: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Simula fetch API para cargar orden por id
  const fetchOrden = async (id) => {
    // Aquí pones tu llamada real a backend.
    // Ejemplo dummy:
    return new Promise((res) => {
      setTimeout(() => {
        res({
          numeroOrden: "ORD-123",
          tipoOrden: "Compra",
          fecha: "2025-07-30",
          responsable: "Brayan Chamico",
          estadoOrden: "En proceso",
          activos: [
            {
              codigo: "A001",
              descripcion: "Laptop Lenovo",
              marcaModelo: "Lenovo Thinkpad X1",
              serie: "SN123456",
              estado: "Activo",
              responsable: "Brayan Chamico",
              fechaAdquisicion: "2024-05-10",
              valorHistorico: "1200",
              valorActual: "1000",
              referencia: "ORD-123",
              ubicacion: "Oficina 1",
              fechaBaja: "",
              observaciones: "Buen estado",
            },
          ],
        });
      }, 500);
    });
  };

  useEffect(() => {
    if (params.id) {
      setModo("editar");
      fetchOrden(params.id).then((data) => {
        setFormOrden({
          numeroOrden: data.numeroOrden,
          tipoOrden: data.tipoOrden,
          fecha: data.fecha,
          responsable: data.responsable,
          estadoOrden: data.estadoOrden,
        });
        setActivos(data.activos || []);
      });
    }
  }, [params.id]);

  const editable = modo !== "ver";

  // Formularios orden
  const handleOrdenChange = (e) => {
    const { id, value } = e.target;
    if (!editable) return;
    setFormOrden((prev) => ({ ...prev, [id]: value }));
  };

  // Modal activos
  const handleOpen = (index = null) => {
    if (!editable) return;
    if (index !== null) {
      setFormData(activos[index]);
      setEditIndex(index);
    } else {
      setFormData({
        codigo: "",
        descripcion: "",
        marcaModelo: "",
        serie: "",
        estado: "Activo",
        responsable: "",
        fechaAdquisicion: "",
        valorHistorico: "",
        valorActual: "",
        referencia: "",
        ubicacion: "",
        fechaBaja: "",
        observaciones: "",
      });
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (!editable) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    if (!editable) return;
    if (editIndex !== null) {
      const updated = [...activos];
      updated[editIndex] = formData;
      setActivos(updated);
    } else {
      setActivos([...activos, formData]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    if (!editable) return;
    if (window.confirm("¿Estás seguro de eliminar este activo?")) {
      const updated = [...activos];
      updated.splice(index, 1);
      setActivos(updated);
    }
  };

  // Botones principales
  const handleGuardarOrden = () => {
    if (!editable) return;
    // Aquí guardar en backend
    alert("Orden guardada");
  };

  const handleEnviarVerificacion = () => {
    if (!editable) return;
    // Aquí lógica de envío a verificación
    alert("Orden enviada a verificación");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {modo === "nuevo" && "Registro de Orden de Activos"}
        {modo === "editar" && "Edición de Orden de Activos"}
        {modo === "ver" && "Detalle de Orden de Activos"}
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información de la Orden
        </Typography>
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        >
          <TextField
            id="numeroOrden"
            label="Número de Orden"
            value={formOrden.numeroOrden}
            onChange={handleOrdenChange}
            required
            disabled={!editable}
          />
          <FormControl disabled={!editable}>
            <InputLabel id="tipoOrden-label">Tipo de Orden</InputLabel>
            <Select
              labelId="tipoOrden-label"
              id="tipoOrden"
              value={formOrden.tipoOrden}
              onChange={handleOrdenChange}
              label="Tipo de Orden"
              required
            >
              <MenuItem value="Compra">Compra</MenuItem>
              <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
              <MenuItem value="Traslado">Traslado</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="fecha"
            label="Fecha de Emisión"
            type="date"
            value={formOrden.fecha}
            onChange={handleOrdenChange}
            InputLabelProps={{ shrink: true }}
            required
            disabled={!editable}
          />
          <TextField
            id="responsable"
            label="Responsable"
            value={formOrden.responsable}
            onChange={handleOrdenChange}
            required
            disabled={!editable}
          />
          <FormControl disabled={!editable}>
            <InputLabel id="estadoOrden-label">Estado</InputLabel>
            <Select
              labelId="estadoOrden-label"
              id="estadoOrden"
              value={formOrden.estadoOrden}
              onChange={handleOrdenChange}
              label="Estado"
              required
            >
              <MenuItem value="Creada">Creada</MenuItem>
              <MenuItem value="En proceso">En proceso</MenuItem>
              <MenuItem value="Finalizada">Finalizada</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>
          Activos Vinculados
        </Typography>

        {editable && (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpen()}
          >
            + Registrar Activo
          </Button>
        )}

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Marca / Modelo</TableCell>
                <TableCell>Serie</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Responsable</TableCell>
                {editable && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {activos.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={editable ? 10 : 9}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    No hay activos vinculados
                  </TableCell>
                </TableRow>
              )}
              {activos.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>{a.codigo}</TableCell>
                  <TableCell>{a.descripcion}</TableCell>
                  <TableCell>{a.marcaModelo}</TableCell>
                  <TableCell>{a.serie}</TableCell>
                  <TableCell>{a.fechaAdquisicion}</TableCell>
                  <TableCell>{a.valorHistorico}</TableCell>
                  <TableCell>{a.ubicacion}</TableCell>
                  <TableCell>{a.estado}</TableCell>
                  <TableCell>{a.responsable || "-"}</TableCell>
                  {editable && (
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpen(i)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(i)}
                        >
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editable && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGuardarOrden}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleEnviarVerificacion}
            >
              Enviar a verificación
            </Button>
          </Stack>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Registrar Activo</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Información General
          </Typography>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            mb={3}
          >
            <TextField
              id="codigo"
              label="Código interno"
              value={formData.codigo}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <TextField
              id="descripcion"
              label="Descripción general"
              value={formData.descripcion}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <TextField
              id="marcaModelo"
              label="Marca y modelo"
              value={formData.marcaModelo}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <TextField
              id="serie"
              label="Número de serie"
              value={formData.serie}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <FormControl disabled={!editable}>
              <InputLabel id="estado-label">Estado del activo</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                value={formData.estado}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, estado: e.target.value }))
                }
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="En reparación">En reparación</MenuItem>
                <MenuItem value="Dado de baja">Dado de baja</MenuItem>
                <MenuItem value="Asignado">Asignado</MenuItem>
                <MenuItem value="Extraviado">Extraviado</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="responsable"
              label="Responsable asignado (opcional)"
              value={formData.responsable}
              onChange={handleChange}
              disabled={!editable}
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Datos de Adquisición
          </Typography>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            mb={3}
          >
            <TextField
              id="fechaAdquisicion"
              label="Fecha de adquisición"
              type="date"
              value={formData.fechaAdquisicion}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              disabled={!editable}
            />
            <TextField
              id="valorHistorico"
              label="Valor histórico"
              type="number"
              value={formData.valorHistorico}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <TextField
              id="valorActual"
              label="Valor actual (opcional)"
              type="number"
              value={formData.valorActual}
              onChange={handleChange}
              disabled={!editable}
            />
            <TextField
              id="referencia"
              label="Referencia a orden origen"
              value={formData.referencia}
              onChange={handleChange}
              required
              disabled={!editable}
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Ubicación y Estado
          </Typography>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            mb={3}
          >
            <TextField
              id="ubicacion"
              label="Ubicación actual"
              value={formData.ubicacion}
              onChange={handleChange}
              required
              disabled={!editable}
            />
            <TextField
              id="fechaBaja"
              label="Fecha de baja (si aplica)"
              type="date"
              value={formData.fechaBaja}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              disabled={!editable}
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Observaciones Técnicas
          </Typography>
          <TextField
            id="observaciones"
            label="Detalles técnicos, condiciones, etc."
            multiline
            rows={3}
            value={formData.observaciones}
            onChange={handleChange}
            fullWidth
            disabled={!editable}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" disabled={!editable}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            color="secondary"
            variant="contained"
            disabled={!editable}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdenesActivos;
