import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useTheme } from "@mui/material/styles";

import TabGeneral from "./components/tabs/TabGeneral";
import TabAdquisicion from "./components/tabs/TabAdquisicion";
import TabUbicacion from "./components/tabs/TabUbicacion";
import TabLegal from "./components/tabs/TabLegal";
import TabGarantia from "./components/tabs/TabGarantia";
import TabMantenimiento from "./components/tabs/TabMantenimiento";
import TabContable from "./components/tabs/TabContable";
import TabBaja from "./components/tabs/TabBaja";
import TabMultimedia from "./components/tabs/TabMultimedia";

import { FTextField } from "./components/FormControls";

type FormData = { [key: string]: any };

const initialFormData: FormData = {
  // General
  codigo: "",
  descripcion: "",
  tipoActivoId: "",
  estadoActivoId: "",
  categoriaContableId: "",
  numeroSerie: "",
  marca: "",
  modelo: "",
  // Adquisicion
  fechaAdquisicion: "",
  proveedor: "",
  factura: "",
  valor: "",
  valorResidual: "",
  vidaUtil: "",
  metodoDepreciacionId: "",
  moneda: "USD",
  // Ubicacion
  ubicacion: "",
  direccion: "",
  departamento: "",
  responsable: "",
  // Legal
  numeroLegal: "",
  seguro: "",
  vencimientoSeguro: "",
  garantia: "",
  documentosAdjuntos: null,
  documentosAdjuntosFileName: "",
  // Garantia
  tieneGarantia: "",
  inicioGarantia: "",
  finGarantia: "",
  proveedorGarantia: "",
  // Mantenimiento
  frecuenciaMantenimiento: "",
  proximoMantenimiento: "",
  // Contable
  cuentaContable: "",
  centroCostos: "",
  depreciacionAcumulada: "",
  valorLibros: "",
  fechaUltimaDepreciacion: "",
  estadoDepreciacion: "",
  // Baja
  fechaBaja: "",
  motivoBaja: "",
  valorRecuperacion: "",
  destinoFinal: "",
  responsableBaja: "",
  // Multimedia / auditorias
  fotosActivo: null,
  documentosAdjuntosMult: null,
  auditorias: "",
};

const ActivoFijoForm: React.FC = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dialog proveedor (preservo tus handlers)
  const [open, setOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [proveedores, setProveedores] = useState<string[]>(["Proveedor A", "Proveedor B", "Proveedor C"]);

  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const tabTitles = [
    "General",
    "Adquisición",
    "Ubicación",
    "Legal",
    "Garantia",
    "Mantenimiento",
    "Contable",
    "Baja",
    "Multimedia",
  ];

  const selects = useMemo(() => ({
    tipoActivoId: ["Mobiliario", "Vehículo", "Maquinaria", "Equipo de cómputo"],
    estadoActivoId: ["Activo", "Inactivo", "En mantenimiento"],
    categoriaContableId: ["Mobiliario de oficina", "Vehículos livianos"],
    metodoDepreciacionId: ["Lineal", "Suma de dígitos"],
    estadoDepreciacion: ["Activo", "Completamente depreciado"],
  }), []);

  const [formData, setFormData] = useState<FormData>(() => {
    // intenta recuperar desde localStorage si quieres persistencia
    try {
      const raw = localStorage.getItem("activoFormDraft");
      return raw ? JSON.parse(raw) : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  useEffect(() => {
    // persiste borrador en localStorage (opcional)
    localStorage.setItem("activoFormDraft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mantenemos tus funciones públicas (no las cambié, pero las integré)
  const handleValidarRuc = () => {
    console.log("Validando RUC:", ruc);
    // aquí podrías llamar a API de SUNAT/SRI etc. y completar razonSocial si existe
  };

  const handleGuardarProveedor = () => {
    console.log("Guardando proveedor:", { ruc, razonSocial });
    // simulo guardado y actualizo lista
    const newProv = razonSocial || proveedorSeleccionado || `Proveedor ${proveedores.length + 1}`;
    setProveedores((prev) => [...prev, newProv]);
    setProveedorSeleccionado(newProv);
    setOpen(false);
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    if (!files) return;
    // guardo referencia simple y nombres
    if (name === "fotosActivo") {
      setFormData((prev) => ({ ...prev, fotosActivo: files, fotosActivoFileName: Array.from(files).map(f => f.name).join(", ") }));
    } else if (name === "documentosAdjuntos") {
      setFormData((prev) => ({ ...prev, documentosAdjuntosMult: files, documentosAdjuntosFileName: Array.from(files).map(f => f.name).join(", ") }));
    } else if (name === "documentosAdjuntosLegal") {
      setFormData((prev) => ({ ...prev, documentosAdjuntos: files, documentosAdjuntosFileName: Array.from(files).map(f => f.name).join(", ") }));
    }
  };

  const handleNext = () => {
    if (currentIndex < tabTitles.length - 1) setCurrentIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleTabClick = (_e: React.SyntheticEvent, newValue: number) => {
    setCurrentIndex(newValue);
  };

  const validateBeforeSubmit = (): { ok: boolean; messages?: string[] } => {
    const msgs: string[] = [];
    if (!formData.codigo) msgs.push("Código del activo es requerido.");
    if (!formData.descripcion) msgs.push("Descripción es requerida.");
    if (!formData.tipoActivoId) msgs.push("Tipo de activo es requerido.");
    // agrega otras reglas si lo deseas...
    return { ok: msgs.length === 0, messages: msgs };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateBeforeSubmit();
    if (!v.ok) {
      alert("Errores:\n" + v.messages!.join("\n"));
      return;
    }
    // preparar FormData si hay archivos
    const payload = new FormData();
    Object.keys(formData).forEach((k) => {
      const val = (formData as any)[k];
      if (val instanceof FileList) {
        Array.from(val).forEach((f: File) => payload.append(k, f));
      } else if (val !== undefined && val !== null) {
        payload.append(k, typeof val === "object" ? JSON.stringify(val) : String(val));
      }
    });

    console.log("Enviar correctamente al backend con payload (FormData) ->", payload, formData);

    // una vez enviado, limpiar borrador:
    localStorage.removeItem("activoFormDraft");
  };

  // Progreso visual: porcentaje de tabs completadas (muy simple)
  const progress = Math.round(((currentIndex + 1) / tabTitles.length) * 100);

  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12}}>
        <Typography variant="h4" align="center" color="primary">Registro de Activos</Typography>
      </Grid>

      <Grid size={{xs:12}}>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Tabs
              value={currentIndex}
              onChange={handleTabClick}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                px: 2,
                pt: 2,
                backgroundColor: theme.palette.background.default,
              }}
            >
              {tabTitles.map((title, index) => (
                <Tab key={index} label={title} />
              ))}
            </Tabs>

            <Box sx={{ p: 3 }}>
              <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>{tabTitles[currentIndex]}</Typography>

              <Grid container spacing={2}>
                {currentIndex === 0 && <TabGeneral formData={formData} onChange={handleChange} selects={selects} />}
                {currentIndex === 1 && <TabAdquisicion
                  formData={formData}
                  onChange={handleChange}
                  proveedores={proveedores}
                  proveedorSeleccionado={proveedorSeleccionado}
                  setProveedorSeleccionado={(val: any) => { setProveedorSeleccionado(val); handleChange("proveedor", val); }}
                  abrirRegistrarProveedor={() => setOpen(true)}
                  selects={selects}
                />}
                {currentIndex === 2 && <TabUbicacion formData={formData} onChange={handleChange} />}
                {currentIndex === 3 && <TabLegal formData={formData} onChange={handleChange} proveedores={proveedores} proveedorSeleccionado={proveedorSeleccionado} setProveedorSeleccionado={(v: string) => { setProveedorSeleccionado(v); handleChange("proveedorGarantia", v); }} />}
                {currentIndex === 4 && <TabGarantia formData={formData} onChange={handleChange} proveedores={proveedores} proveedorSeleccionado={proveedorSeleccionado} setProveedorSeleccionado={(v: string) => { setProveedorSeleccionado(v); handleChange("proveedorGarantia", v); }} selects={selects} />}
                {currentIndex === 5 && <TabMantenimiento formData={formData} onChange={handleChange} />}
                {currentIndex === 6 && <TabContable formData={formData} onChange={handleChange} selects={selects} />}
                {currentIndex === 7 && <TabBaja formData={formData} onChange={handleChange} />}
                {currentIndex === 8 && <TabMultimedia formData={formData} onChange={handleChange} handleFileChange={handleFileChange} />}
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button type="button" variant="contained" disabled={currentIndex === 0} onClick={handlePrev}>Anterior</Button>

                {currentIndex < tabTitles.length - 1 ? (
                  <Button type="button" variant="contained" onClick={handleNext}>Siguiente</Button>
                ) : (
                  <Button type="submit" variant="contained">Registrar Activo</Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Grid>

      {/* Dialog para registro de proveedor (igual que tu original, con RUC y Razón Social) */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Registrar proveedor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{xs:8}}>
              <FTextField label="RUC" name="ruc" value={ruc} onChange={(n, v) => setRuc(v)} />
            </Grid>
            <Grid size={{xs:4}}>
              <Button variant="outlined" onClick={handleValidarRuc} fullWidth sx={{ height: "100%" }}>Validar</Button>
            </Grid>

            <Grid size={{xs:8}}>
              <FTextField label="Razón Social" name="razonSocial" value={razonSocial} onChange={(n, v) => setRazonSocial(v)} />
            </Grid>
            <Grid size={{xs:4}}>
              <Button variant="contained" onClick={handleGuardarProveedor} fullWidth sx={{ height: "100%" }}>Guardar</Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ActivoFijoForm;
