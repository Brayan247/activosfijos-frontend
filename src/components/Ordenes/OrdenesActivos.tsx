import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  SelectChangeEvent,
} from "@mui/material";
import api from "../../services/axios";
import SelectInput from "../Input/SelectInput";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDashboardData } from "../../features/dashboard/dashboardService";

interface EstadoOrdenDto {
  estado_orden_id: number;
  nombre: string;
  activo: boolean;
}

interface Activo {
  numeroOrden: string;
  codigo: string;
  descripcion: string;
  marcaModelo: string;
  serie: string;
  estado: string;
  responsableAsignado: string;
  fechaAdquisicion: string;
  valorHistorico: string;
  valorActual: string;
  ubicacion: string;
  fechaBaja: string;
  observaciones: string;
  empresaId?: number;
  usuarioId?: number;
}

interface OrdenData {
  numeroOrden: string;
  tipoOrden: string;
  fechaEmision: string;
  responsable: string;
  proveedor: number;
  observaciones?: string;
  estadoOrden?: number;
  motivoRechazo?: string;
  activosJson: string;
  usuarioId?: number;
  empresaId?: number;
}

interface DashboardDto {
  usuarioId: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  rolId: number;
  idiomaPreferido: string;
  username: string;
  ultimoLogin: string | null;
  ipUltimoLogin: string | null;
  empresaId: number;
  nombreComercial: string;
  colorPrimario?: string;
  colorSecundario?: string;
  logoUrl?: string;
  temaOscuro?: boolean;
  fuentePersonalizada?: string;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const OrdenesActivos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state: RootState) => state.auth.token);

  const orden = location.state?.orden;

  const [dashboardData, setDashboardData] = useState<DashboardDto | null>(null);
  const modoInicial = location.state?.modo === "ver" ? "ver" : "nuevo";

  const [modo, setModo] = useState<"ver" | "nuevo" | "editar">(modoInicial);
  const [formOrden, setFormOrden] = useState<OrdenData>({
    numeroOrden: orden?.numeroOrden || "",
    tipoOrden: orden?.tipoOrden || "",
    fechaEmision: orden?.fechaEmision || "",
    responsable: orden?.responsable || "",
    proveedor: orden?.proveedor || "",
    observaciones: orden?.observaciones || "",
    estadoOrden: orden?.estadoOrden || 0,
    motivoRechazo: orden?.motivoRechazo || "",
    activosJson:
      typeof orden?.activosJson === "string"
        ? JSON.parse(orden.activosJson)
        : orden?.activos || [],
    empresaId: dashboardData?.empresaId,
    usuarioId: dashboardData?.usuarioId,
  });

  const [activos, setActivos] = useState<Activo[]>(
    typeof orden?.activosJson === "string"
      ? JSON.parse(orden.activosJson)
      : orden?.activos || []
  );

  const [estados, setEstados] = useState<EstadoOrdenDto[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<Activo>({
    numeroOrden: "",
    codigo: "",
    descripcion: "",
    marcaModelo: "",
    serie: "",
    estado: "Activo",
    responsableAsignado: "",
    fechaAdquisicion: "",
    valorHistorico: "",
    valorActual: "",
    ubicacion: "",
    fechaBaja: "",
    observaciones: "",
    empresaId: dashboardData?.empresaId,
    usuarioId: dashboardData?.usuarioId,
  });

  const editable = modo !== "ver";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setDashboardData(dashboardData);
        const catalogo = await api.get(`/catalogos/estado-orden`);
        const catalogos = catalogo.data;
        setEstados(catalogos);
      } catch {
        throw new Error("No se pudo cargar la información del dashboard.");
      }
    };

    fetchData();
  }, [navigate, token]);

  const validarStepActual = () => {
    switch (step) {
      case 0:
        return (
          formData.codigo.trim() !== "" &&
          formData.descripcion.trim() !== "" &&
          formData.marcaModelo.trim() !== "" &&
          formData.serie.trim() !== ""
        );
      case 1:
        return (
          formData.fechaAdquisicion.trim() !== "" &&
          formData.valorHistorico.trim() !== ""
        );
      case 2:
        return formData.ubicacion.trim() !== "";
      default:
        return true;
    }
  };

  const handleOrdenChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
  ) => {
    if (!editable) return;

    const { name, id, value } = e.target as any;
    const key = name || id;

    const parsedValue = key === "estadoOrden" ? Number(value) : value;

    setFormOrden((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (!editable) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOpen = (index: number | null = null) => {
    if (!editable) return;
    setStep(0);
    if (index !== null) {
      setFormData(activos[index]);
      setEditIndex(index);
    } else {
      setFormData({
        numeroOrden: "",
        codigo: "",
        descripcion: "",
        marcaModelo: "",
        serie: "",
        estado: "Activo",
        responsableAsignado: "",
        fechaAdquisicion: "",
        valorHistorico: "",
        valorActual: "",
        ubicacion: "",
        fechaBaja: "",
        observaciones: "",
        empresaId: 0,
        usuarioId: 0,
      });
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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

  const handleDelete = (index: number) => {
    if (!editable) return;
    if (window.confirm("¿Estás seguro de eliminar este activo?")) {
      const updated = [...activos];
      updated.splice(index, 1);
      setActivos(updated);
    }
  };

  const validarFormularioCompleto = () => {
    const camposRequeridos = [
      "numeroOrden",
      "tipoOrden",
      "fecha",
      "responsable",
    ];

    for (const campo of camposRequeridos) {
      const valor = formOrden[campo as keyof typeof formOrden];
      if (
        valor === undefined ||
        valor === null ||
        valor.toString().trim() === ""
      ) {
        return false;
      }
    }
    return true;
  };

  const handleGuardarOrden = async () => {
    try {
      if (!editable) return;
      const ordenAEnviar = {
        ...formOrden,
        activosJson: activos,
        estadoOrden: 1,
        empresaId: dashboardData?.empresaId,
        usuarioId: dashboardData?.usuarioId 
      };
      const payload = ordenAEnviar;
      console.log(payload)
      const response = await api.post("/orden-activos/registrar", payload);
      console.log(response);
    } catch (err: any) {
      throw new Error(err.response?.data?.mensaje);
    }
  };

  const handleEnviarVerificacion = () => {
    if (!editable) return;
    const ordenAEnviar = {
      ...formOrden,
      activosJson: activos,
      estadoOrden: 2,
    };
    console.log(ordenAEnviar);
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
            name="fechaEmision"
            label="Fecha de Emisión"
            type="date"
            value={formOrden.fechaEmision.slice(0, 10)}
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
          {(modo === "ver" || modo === "editar") && (
            <FormControl>
              <SelectInput
                name="paisId"
                label="Estado Orden"
                value={formOrden.estadoOrden ?? 0}
                onChange={handleOrdenChange}
                options={estados.map((p) => ({
                  value: p.estado_orden_id,
                  label: p.nombre || "",
                }))}
                disabled={true}
              />
            </FormControl>
          )}
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
      </Box>

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
              <TableCell>Encargado</TableCell>
              {editable && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {activos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={editable ? 10 : 9}
                  align="center"
                  sx={{ py: 5 }}
                >
                  No hay activos vinculados
                </TableCell>
              </TableRow>
            ) : (
              activos.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>{a.codigo}</TableCell>
                  <TableCell>{a.descripcion}</TableCell>
                  <TableCell>{a.marcaModelo}</TableCell>
                  <TableCell>{a.serie}</TableCell>
                  <TableCell>{formatDate(a.fechaAdquisicion)}</TableCell>
                  <TableCell>{a.valorHistorico}</TableCell>
                  <TableCell>{a.ubicacion}</TableCell>
                  <TableCell>{a.estado}</TableCell>
                  <TableCell>{a.responsableAsignado || "-"}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal tipo wizard */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Registrar Activo</DialogTitle>
        <DialogContent>
          {step === 0 && (
            <>
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
              </Box>
            </>
          )}
          {step === 1 && (
            <>
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
                  id="responsableAsignado"
                  label="Responsable asignado"
                  value={formData.responsableAsignado}
                  onChange={handleChange}
                  required
                  disabled={!editable}
                />
              </Box>
            </>
          )}
          {step === 2 && (
            <>
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
            </>
          )}
          {step === 3 && (
            <>
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          {step > 0 && (
            <Button onClick={() => setStep((prev) => prev - 1)}>
              Anterior
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => {
                if (validarStepActual()) {
                  setStep((prev) => prev + 1);
                } else {
                  alert("Por favor complete todos los campos requeridos.");
                }
              }}
              variant="contained"
            >
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleSave} color="secondary" variant="contained">
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>

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

      {modo === "ver" &&
        (formOrden.estadoOrden === 1 || formOrden.estadoOrden === 4) && (
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModo("editar")}
            >
              Editar
            </Button>
          </Stack>
        )}
    </Box>
  );
};

export default OrdenesActivos;
