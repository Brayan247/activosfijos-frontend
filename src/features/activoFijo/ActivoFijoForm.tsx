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
import Grid from "@mui/material/Grid";
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
import api from "../../services/axios";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

type FormData = { [key: string]: any };

const initialFormData: FormData = {
  // General
  empresaId: 0,
  descripcion: "",
  tipoActivoId: 0,
  estadoActivoId: 0,
  categoriaContableId: 0,
  numeroSerie: "",
  marca: "",
  modelo: "",
  notasTecnicas: "",
  // Adquisición
  fechaAdquisicion: "",
  proveedor: "",
  factura: "",
  valor: 0,
  valorResidual: 0,
  vidaUtil: 0,
  metodoDepreciacion: 0,
  moneda: "",
  // Ubicación
  ubicacion: "",
  direccion: "",
  departamento: "",
  responsable: "",
  // Legal
  numeroLegal: "",
  seguro: "",
  vencimientoSeguro: null,
  garantia: "",
  documentosAdjuntos: null,
  documentosAdjuntosFileName: "",
  // Garantía
  tieneGarantia: false,
  inicioGarantia: null,
  finGarantia: null,
  proveedorGarantia: "",
  // Mantenimiento
  frecuenciaMantenimiento: "",
  proximoMantenimiento: null,
  ultimaEjecucion: null,
  tipoMantenimiento: "",
  proveedorMantenimiento: "",
  costoEstimado: 0,
  observaciones: "",
  // Contable
  cuentaContable: "",
  centroCostos: "",
  depreciacionAcumulada: 0,
  valorLibros: 0,
  fechaUltimaDepreciacion: null,
  estadoDepreciacion: "",
  // Baja
  fechaBaja: null,
  motivoBaja: "",
  valorRecuperacion: 0,
  destinoFinal: "",
  responsableBaja: "",
  // Multimedia / auditorías
  fotosActivo: null,
  documentosAdjuntosMult: null,
  auditorias: "",
};

interface ProveedorActivos {
  proveedorId: number;
  ruc: string;
  razonSocial: string;
  empresaId: number;
}

interface CatalogoGenerico {
  Id: number;
  Nombre: string;
  Descripcion?: string;
  Codigo?: string;
}

const ActivoFijoForm: React.FC = () => {
  const theme = useTheme();
  const [validateruc, setValidateRuc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dialog proveedor (preservo tus handlers)
  const [open, setOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [proveedores, setProveedores] = useState<ProveedorActivos[]>([]);

  // Catálogos
  // Estados para catálogos con seleccionado para cada uno
  const [tipoActivoSeleccionado, setTipoActivoSeleccionado] = useState("");
  const [tiposActivo, setTiposActivo] = useState<CatalogoGenerico[]>([]);

  const [estadoActivoSeleccionado, setEstadoActivoSeleccionado] = useState("");
  const [estadosActivo, setEstadosActivo] = useState<CatalogoGenerico[]>([]);

  const [categoriaContableSeleccionada, setCategoriaContableSeleccionada] =
    useState("");
  const [categoriasContable, setCategoriasContable] = useState<
    CatalogoGenerico[]
  >([]);

  const [metodoDepreciacionSeleccionado, setMetodoDepreciacionSeleccionado] =
    useState("");
  const [metodosDepreciacion, setMetodosDepreciacion] = useState<
    CatalogoGenerico[]
  >([]);

  const [monedaSeleccionada, setMonedaSeleccionada] = useState("");
  const [monedas, setMonedas] = useState<CatalogoGenerico[]>([]);

  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [departamentos, setDepartamentos] = useState<CatalogoGenerico[]>([]);

  const [cuentaContableSeleccionada, setCuentaContableSeleccionada] =
    useState("");
  const [cuentasContables, setCuentasContables] = useState<CatalogoGenerico[]>(
    []
  );

  const [centroCostoSeleccionado, setCentroCostoSeleccionado] = useState("");
  const [centrosCostos, setCentrosCostos] = useState<CatalogoGenerico[]>([]);

  const [
    frecuenciaMantenimientoSeleccionada,
    setFrecuenciaMantenimientoSeleccionada,
  ] = useState("");
  const [frecuenciasMantenimiento, setFrecuenciasMantenimiento] = useState<
    CatalogoGenerico[]
  >([]);

  const [tipoMantenimientoSeleccionado, setTipoMantenimientoSeleccionado] =
    useState("");
  const [tiposMantenimiento, setTiposMantenimiento] = useState<
    CatalogoGenerico[]
  >([]);

  const [motivoBajaSeleccionado, setMotivoBajaSeleccionado] = useState("");
  const [motivosBaja, setMotivosBaja] = useState<CatalogoGenerico[]>([]);

  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const dataDashboard = useSelector((state: RootState) => state.dashboard.data);

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

  const selects = useMemo(
    () => ({
      estadoDepreciacion: ["Activo", "Completamente depreciado"],
    }),
    []
  );
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const raw = localStorage.getItem("activoFormDraft");
      return raw ? JSON.parse(raw) : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  const fetchData = async () => {
    try {
      const empresaId = dataDashboard?.empresaId;
      const response = await api.get(
        `/activo-fijo/catalogo/proveedores?empresaId=${empresaId}`
      );
      setProveedores(response.data.datos);

      // Catálogos
      const [
        tipoRes,
        estadoRes,
        catContRes,
        metodoRes,
        monedaRes,
        depRes,
        cuentaRes,
        centroRes,
        frecuenciaMantRes,
        tipoMantRes,
        motivoBajaRes,
      ] = await Promise.all([
        api.get(`/catalogos/tipo-activo`),
        api.get(`/catalogos/estado-activo`),
        api.get(`/catalogos/categoria-contable`),
        api.get(`/catalogos/metodo-depreciacion`),
        api.get(`/catalogos/moneda`),
        api.get(`/catalogos/departamento`),
        api.get(`/catalogos/cuenta-contable`),
        api.get(`/catalogos/centro-costos`),
        api.get(`/catalogos/frecuencia-mantenimiento`),
        api.get(`/catalogos/tipo-mantenimiento`),
        api.get(`/catalogos/motivo-baja`),
      ]);

      setTiposActivo(tipoRes.data);
      setEstadosActivo(estadoRes.data);
      setCategoriasContable(catContRes.data);
      setMetodosDepreciacion(metodoRes.data);
      setMonedas(monedaRes.data);
      setDepartamentos(depRes.data);
      setCuentasContables(cuentaRes.data);
      setCentrosCostos(centroRes.data);
      setFrecuenciasMantenimiento(frecuenciaMantRes.data);
      setTiposMantenimiento(tipoMantRes.data);
      setMotivosBaja(motivoBajaRes.data);
    } catch {
      throw new Error("No se pudo cargar la información del dashboard.");
    }
  };

  useEffect(() => {
    localStorage.setItem("activoFormDraft", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mantenemos tus funciones públicas (no las cambié, pero las integré)
  const handleValidarRuc = async () => {
    try {
      const response = await api.get(
        `/activo-fijo/catalogo/validar-ruc?ruc=${ruc}`
      );
      const datos = response.data?.datos;
      const data = datos[0];
      setRazonSocial(data.razonSocial);
      setValidateRuc(true);
    } catch (err: any) {
      setRazonSocial("");
    }
  };

  const handleGuardarProveedor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ruc: ruc,
        razonSocial: razonSocial,
        empresaId: dataDashboard?.empresaId,
      };
      await api.post("/activo-fijo/catalogo/registrar-proveedor", payload);
      await fetchData();
      setOpen(false);
      setRuc("");
      setRazonSocial("");
    } catch (err: any) {
      console.log(err.response?.data?.mensaje);
    }
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    if (!files) return;
    // guardo referencia simple y nombres
    if (name === "fotosActivo") {
      setFormData((prev) => ({
        ...prev,
        fotosActivo: files,
        fotosActivoFileName: Array.from(files)
          .map((f) => f.name)
          .join(", "),
      }));
    } else if (name === "documentosAdjuntos") {
      setFormData((prev) => ({
        ...prev,
        documentosAdjuntosMult: files,
        documentosAdjuntosFileName: Array.from(files)
          .map((f) => f.name)
          .join(", "),
      }));
    } else if (name === "documentosAdjuntosLegal") {
      setFormData((prev) => ({
        ...prev,
        documentosAdjuntos: files,
        documentosAdjuntosFileName: Array.from(files)
          .map((f) => f.name)
          .join(", "),
      }));
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
    if (!formData.descripcion) msgs.push("Descripción es requerida.");
    // agrega otras reglas si lo deseas...
    return { ok: msgs.length === 0, messages: msgs };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const v = validateBeforeSubmit();
      if (!v.ok) {
        alert("Errores:\n" + v.messages!.join("\n"));
        return;
      }
      const dataToSend = { ...formData };

      dataToSend.empresaId = dataDashboard?.empresaId;
      console.log(dataToSend);
      await api.post("/activo/registrar", dataToSend);
      localStorage.removeItem("activoFormDraft");
    } catch (err: any) {
      const mensajeError =
        err?.response?.data?.mensaje || "Error inesperado, intenta de nuevo.";
      alert(mensajeError);
    }
  };

  // Progreso visual: porcentaje de tabs completadas (muy simple)
  const progress = Math.round(((currentIndex + 1) / tabTitles.length) * 100);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" align="center" color="primary">
          Registro de Activos
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
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
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                {tabTitles[currentIndex]}
              </Typography>

              <Grid container spacing={2}>
                {currentIndex === 0 && (
                  <TabGeneral
                    formData={formData}
                    onChange={handleChange}
                    categoriaContable={categoriasContable.map((p) => p.Nombre)}
                    categoriaContableSeleccionado={
                      categoriaContableSeleccionada
                    }
                    estadoActivos={estadosActivo.map((p) => p.Nombre)}
                    estadoActivoSeleccionado={estadoActivoSeleccionado}
                    tipoActivos={tiposActivo.map((p) => p.Nombre)}
                    tipoActivoSeleccionado={tipoActivoSeleccionado}
                    setCategoriaContableSeleccionado={(val: any) => {
                      setCategoriaContableSeleccionada(val);
                      handleChange("categoriaContableId", val);
                    }}
                    setTipoActivoSeleccionado={(val: any) => {
                      setTipoActivoSeleccionado(val);
                      handleChange("tipoActivoId", val);
                    }}
                    setEstadoActivoSeleccionado={(val: any) => {
                      setEstadoActivoSeleccionado(val);
                      handleChange("estadoActivoId", val);
                    }}
                  />
                )}
                {currentIndex === 1 && (
                  <TabAdquisicion
                    formData={formData}
                    onChange={handleChange}
                    proveedores={proveedores.map((p) => p.razonSocial)}
                    proveedorSeleccionado={proveedorSeleccionado}
                    setProveedorSeleccionado={(val: any) => {
                      setProveedorSeleccionado(val);
                      handleChange("proveedor", val);
                    }}
                    metodosDepreciacion={metodosDepreciacion.map(
                      (p) => p.Nombre
                    )}
                    metodoDepreciacionSeleccionado={
                      metodoDepreciacionSeleccionado
                    }
                    setMetodoDepreciacionSeleccionado={(val: any) => {
                      setMetodoDepreciacionSeleccionado(val);
                      handleChange("metodoDepreciacion", val);
                    }}
                    monedas={monedas.map((p) => p.Codigo ?? "")}
                    monedaSeleccionada={monedaSeleccionada}
                    setMonedaSeleccionada={(val: any) => {
                      setMonedaSeleccionada(val);
                      handleChange("moneda", val);
                    }}
                    abrirRegistrarProveedor={() => setOpen(true)}
                  />
                )}
                {currentIndex === 2 && (
                  <TabUbicacion
                    formData={formData}
                    onChange={handleChange}
                    departamentos={departamentos.map((p) => p.Nombre)}
                    departamentoSeleccionado={departamentoSeleccionado}
                    setDepartamentoSeleccionado={(v: string) => {
                      setDepartamentoSeleccionado(v);
                      handleChange("departamento", v);
                    }}
                  />
                )}
                {currentIndex === 3 && (
                  <TabLegal
                    formData={formData}
                    onChange={handleChange}
                    proveedores={proveedores.map((p) => p.razonSocial)}
                    proveedorSeleccionado={proveedorSeleccionado}
                    setProveedorSeleccionado={(v: string) => {
                      setProveedorSeleccionado(v);
                      handleChange("proveedorGarantia", v);
                    }}
                  />
                )}
                {currentIndex === 4 && (
                  <TabGarantia
                    formData={formData}
                    onChange={handleChange}
                  />
                )}
                {currentIndex === 5 && (
                  <TabMantenimiento
                    formData={formData}
                    onChange={handleChange}
                    frecuenciasMantenimiento={frecuenciasMantenimiento.map(
                      (p) => p.Nombre
                    )}
                    frecuenciaMantenimientoSeleccionado={
                      frecuenciaMantenimientoSeleccionada
                    }
                    setFrecuenciaMantenimientoSeleccionado={(v: string) => {
                      setFrecuenciaMantenimientoSeleccionada(v);
                      handleChange("frecuenciaMantenimiento", v);
                    }}
                    tiposMantenimiento={tiposMantenimiento.map((p) => p.Nombre)}
                    tipoMantenimientoSeleccionado={
                      tipoMantenimientoSeleccionado
                    }
                    setTipoMantenimientoSeleccionado={(v: string) => {
                      setTipoMantenimientoSeleccionado(v);
                      handleChange("tipoMantenimiento", v);
                    }}
                  />
                )}
                {currentIndex === 6 && (
                  <TabContable
                    formData={formData}
                    onChange={handleChange}
                    selects={selects}
                    cuentaContable={cuentasContables.map((p) => p.Nombre)}
                    cuentaContableSeleccionada={cuentaContableSeleccionada}
                    setCuentaContableSeleccionada={(v: string) => {
                      setCuentaContableSeleccionada(v);
                      handleChange("cuentaContable", v);
                    }}
                    centrosCostos={centrosCostos.map((p) => p.Nombre)}
                    centroCostoSeleccionado={centroCostoSeleccionado}
                    setCentroCostoSeleccionado={(v: string) => {
                      setCentroCostoSeleccionado(v);
                      handleChange("centroCostos", v);
                    }}
                  />
                )}
                {currentIndex === 7 && (
                  <TabBaja
                    formData={formData}
                    onChange={handleChange}
                    motivosBaja={motivosBaja.map((p) => p.Nombre)}
                    motivoBajaSeleccionado={motivoBajaSeleccionado}
                    setMotivoBajaSeleccionado={(v: string) => {
                      setMotivoBajaSeleccionado(v);
                      handleChange("motivoBaja", v);
                    }}
                  />
                )}
                {currentIndex === 8 && (
                  <TabMultimedia
                    formData={formData}
                    onChange={handleChange}
                    handleFileChange={handleFileChange}
                  />
                )}
              </Grid>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  type="button"
                  variant="contained"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                >
                  Anterior
                </Button>

                {currentIndex < tabTitles.length - 1 ? (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" variant="contained">
                    Registrar Activo
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Grid>

      {/* Dialog para registro de proveedor (igual que tu original, con RUC y Razón Social) */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Registrar proveedor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 8 }}>
              <FTextField
                label="RUC"
                name="ruc"
                value={ruc}
                onChange={(n, v) => setRuc(v)}
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Button
                variant="outlined"
                onClick={handleValidarRuc}
                fullWidth
                sx={{ height: "100%" }}
              >
                Validar
              </Button>
            </Grid>
            <Grid size={{ xs: 8 }}>
              <FTextField
                label="Razón Social"
                name="razonSocial"
                value={razonSocial}
                disabled
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Button
                variant="contained"
                onClick={handleGuardarProveedor}
                fullWidth
                disabled={!validateruc}
                sx={{ height: "100%" }}
              >
                Guardar
              </Button>
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
