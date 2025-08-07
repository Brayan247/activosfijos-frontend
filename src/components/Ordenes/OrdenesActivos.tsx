import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

interface TipoOrdenDto {
  tipo_orden_id: number;
  nombre: string;
  estado: boolean;
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
  const modoInicial = location.state?.modo === "ver" ? "ver" : "nuevo";

  const [dashboardData, setDashboardData] = useState<DashboardDto | null>(null);
  const [modo, setModo] = useState<"ver" | "nuevo" | "editar">(modoInicial);
  const [estados, setEstados] = useState<EstadoOrdenDto[]>([]);
  const [tipoOrden, setTipoOrden] = useState<TipoOrdenDto[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const editable = modo !== "ver";

  const [error, setError] = useState<string | null>(null);
  const [erroresForm, setErroresForm] = useState<Record<string, string>>({});

  const mapActivos = (rawActivos: any[]): Activo[] => {
    return rawActivos.map((a) => ({
      numeroOrden: a.NumeroOrden || "",
      codigo: a.Codigo || "",
      descripcion: a.Descripcion || "",
      marcaModelo: a.MarcaModelo || "",
      serie: a.Serie || "",
      estado: a.Estado || "",
      responsableAsignado: a.ResponsableAsignado || "",
      fechaAdquisicion: a.FechaAdquisicion || "",
      valorHistorico: a.ValorHistorico || "",
      valorActual: a.ValorActual || "",
      ubicacion: a.Ubicacion || "",
      fechaBaja: a.FechaBaja || "",
      observaciones: a.Observaciones || "",
      empresaId: a.EmpresaId ?? 0,
      usuarioId: a.UsuarioId ?? 0,
    }));
  };

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
      ? mapActivos(JSON.parse(orden.activosJson))
      : mapActivos(orden?.activos || [])
  );

  const [formData, setFormData] = useState<Activo>(() => ({
    numeroOrden: formOrden.numeroOrden || "",
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
    empresaId: dashboardData?.empresaId || 0,
    usuarioId: dashboardData?.usuarioId || 0,
  }));

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
        setEstados(catalogo.data);

        const tipo = await api.get(`/catalogos/tipo-orden`);
        setTipoOrden(tipo.data);
      } catch {
        throw new Error("No se pudo cargar la información del dashboard.");
      }
    };

    fetchData();
  }, [navigate, token]);

  const validarOrden = (): boolean => {
    const errores: Record<string, string> = {};
    if (!formOrden.numeroOrden.trim())
      errores.numeroOrden = "Campo obligatorio";
    if (!formOrden.tipoOrden.trim()) errores.tipoOrden = "Campo obligatorio";
    if (!formOrden.fechaEmision.trim())
      errores.fechaEmision = "Campo obligatorio";
    if (!formOrden.responsable.trim())
      errores.responsable = "Campo obligatorio";

    setErroresForm(errores);
    return Object.keys(errores).length === 0;
  };

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
    const { name, id, value } = e.target as any;
    const key = name || id;
    const parsedValue = key === "estadoOrden" ? Number(value) : value;

    setFormOrden((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editable) return;
    const { id, value } = e.target;
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

  const handleGuardarOrden = async () => {
    setError(null);
    if (!editable) return;
    if (!validarOrden()) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const payload = {
        ...formOrden,
        activosJson: activos,
        estadoOrden: 1,
        empresaId: dashboardData?.empresaId,
        usuarioId: dashboardData?.usuarioId,
      };
      await api.post("/orden-activos/registrar", payload);
      navigate(-1);
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error al guardar la orden.");
    }
  };

  const handleEnviarVerificacion = async () => {
    const payload = {
      numeroOrden: formOrden.numeroOrden,
      estadoOrden: 2,
      motivoRechazo: formOrden.motivoRechazo || null,
    };

    try {
      await api.put("/orden-activos/actualizar-estado", payload);
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.mensaje || "Error al enviar la orden a verificación"
      );
    }
  };

  const handleRechazarOrden = async () => {
    const errores: Record<string, string> = {};
    if (!formOrden.motivoRechazo?.trim()) {
      errores.motivoRechazo = "Campo obligatorio";
      setErroresForm(errores);
      return;
    }
    const payload = {
      numeroOrden: formOrden.numeroOrden,
      estadoOrden: 4,
      motivoRechazo: formOrden.motivoRechazo || null,
    };

    try {
      await api.put("/orden-activos/actualizar-estado", payload);
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.mensaje || "Error al erechazar la orden");
    }
  };

  const handleAprovarOrden = async () => {
    const payload = {
      numeroOrden: formOrden.numeroOrden,
      estadoOrden: 3,
      motivoRechazo: formOrden.motivoRechazo || null,
    };

    try {
      await api.put("/orden-activos/actualizar-estado", payload);
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.mensaje || "Error al aprovar la orden");
    }
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
            name="numeroOrden"
            label="Número de Orden"
            value={formOrden.numeroOrden}
            onChange={handleOrdenChange}
            required
            error={!!erroresForm.numeroOrden}
            helperText={erroresForm.numeroOrden}
            disabled={!editable}
          />
          <SelectInput
            name="tipoOrden"
            label="Tipo de Orden"
            value={formOrden.tipoOrden}
            onChange={handleOrdenChange}
            options={tipoOrden.map((p) => ({
              value: p.nombre,
              label: p.nombre || "",
            }))}
            error={!!erroresForm.tipoOrden}
            helperText={erroresForm.tipoOrden}
            disabled={!editable}
          />
          <TextField
            name="fechaEmision"
            label="Fecha de Emisión"
            type="date"
            value={formOrden.fechaEmision.slice(0, 10)}
            onChange={handleOrdenChange}
            InputLabelProps={{ shrink: true }}
            required
            error={!!erroresForm.fechaEmision}
            helperText={erroresForm.fechaEmision}
            disabled={!editable}
          />
          <TextField
            name="responsable"
            label="Responsable"
            value={formOrden.responsable}
            onChange={handleOrdenChange}
            error={!!erroresForm.responsable}
            helperText={erroresForm.responsable}
            required
            disabled={!editable}
          />
          {(modo === "ver" || modo === "editar") && (
            <>
              <FormControl>
                <SelectInput
                  name="estadoOrden"
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
              {!(
                formOrden.estadoOrden === 1 || formOrden.estadoOrden === 3
              ) && (
                <TextField
                  name="motivoRechazo"
                  label="Motivo de Rechazo"
                  value={formOrden.motivoRechazo || ""}
                  onChange={handleOrdenChange}
                  error={!!erroresForm.motivoRechazo}
                  helperText={erroresForm.motivoRechazo}
                  disabled={orden?.estadoOrden === 4}
                />
              )}
            </>
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

      {error && (
        <Box mt={4}>
          <Typography color="error" align="center" fontWeight="bold">
            {error}
          </Typography>
        </Box>
      )}

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
            color="warning"
            onClick={handleEnviarVerificacion}
          >
            Enviar a verificación
          </Button>
          {modo === "nuevo" && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGuardarOrden}
            >
              Guardar
            </Button>
          )}
        </Stack>
      )}
      {modo === "ver" && formOrden.estadoOrden === 2 && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 3 }}
          spacing={1}
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
            color="error"
            onClick={handleRechazarOrden}
          >
            Rechazar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAprovarOrden}
          >
            Aprobar
          </Button>
        </Stack>
      )}
      {modo === "ver" &&
        (formOrden.estadoOrden === 1 || formOrden.estadoOrden === 4) && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ mt: 3 }}
            spacing={1}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Regresar
            </Button>
            {dashboardData?.usuarioId === orden.usuarioId && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setModo("editar")}
              >
                Editar
              </Button>
            )}
            {formOrden.estadoOrden === 1 && (
              <Button
                variant="contained"
                color="warning"
                onClick={handleEnviarVerificacion}
              >
                Enviar a verificación
              </Button>
            )}
          </Stack>
        )}
      {modo === "ver" && formOrden.estadoOrden === 3 && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 3 }}
          spacing={1}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default OrdenesActivos;
