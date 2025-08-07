import { useState, useEffect } from "react";
import {
  Grid,
  Alert,
  Box,
  SelectChangeEvent,
  Button,
  Paper,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/Button/PrimaryButton";

import DatosEmpresa from "./DatosGenerales";
import DatosContactoGeografico from "./DatosContactoGeografico";
import ConfiguracionVisualForm from "./ConfiguracionVisual";

import api from "../../../services/axios";
import formatFecha, { validateRucEcuador } from "../../../utils/Helpers";
import mapFormDataToPayload from "../../../types/EmpresaFormData";
import { useDispatch } from "react-redux";
import { setEmpresaId } from "../../../store/slices/authSlice";

import {
  EmpresaFormData,
  initialFormData,
} from "../../../types/EmpresaFormData";

import {
  isValidEmail,
  isValidPhone,
  isValidHexColor,
} from "../../../utils/Helpers";

const EmpresaRegisterForm = () => {
  interface Opcion {
    id: string | number;
    nombre?: string;
    provincia: string;
    canton: string;
    parroquia: string;
  }

  interface ConfiguracionVisual {
    color_primario: string;
    color_secundario: string;
    logo_url?: string;
    tema_oscuro?: boolean;
    fuente_personalizada?: string;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EmpresaFormData>(initialFormData);
  const [errores, setErrores] = useState({});

  const [validatingRuc, setValidatingRuc] = useState(false);
  const [rucError, setRucError] = useState<string | null>(null);
  const [datosConfig, setDatosConfig] = useState<
    ConfiguracionVisual | undefined
  >();

  const [error, setError] = useState("");

  const [paises, setPaises] = useState([]);
  const [provinciaEstados, setprovinciaEstados] = useState<Opcion[]>([]);
  const [cantones, setCantones] = useState<Opcion[]>([]);
  const [ciudadParroquias, setciudadParroquias] = useState<Opcion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paises, provincias] = await Promise.all([
          api.get("/catalogos/paises"),
          api.get("/catalogos/provincias"),
        ]);
        setPaises(paises.data);
        setprovinciaEstados(provincias.data);
        setFormData((prev) => ({
          ...prev,
          paisId: "55",
        }));
      } catch (err) {
        console.error("Error al cargar catálogos", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = async (e: SelectChangeEvent<string | number>) => {
    const name = e.target.name as keyof typeof formData;
    const value = e.target.value;

    // Nuevo objeto base con la asignación normal
    let updatedFormData = {
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value),
    };

    // Proivncia
    if (name === "provinciaEstadoId") {
      const provinciaSeleccionada = provinciaEstados.find(
        (p) => p.id === Number(value) || p.id === value
      );

      if (provinciaSeleccionada) {
        updatedFormData.provinciaEstado = provinciaSeleccionada.provincia;
        const cantones = await api.get(
          `/catalogos/cantones?provinciaId=${provinciaSeleccionada.id}`
        );
        updatedFormData.cantonId = "";
        updatedFormData.canton = "";
        updatedFormData.ciudadParroquia = "";

        updatedFormData.disableCanton = false;
        updatedFormData.disableCiudadParroquia = true;
        setCantones(cantones.data);
      }
    }

    // Canton
    if (name === "cantonId") {
      const cantonSeleccionado = cantones.find(
        (c) => c.id === Number(value) || c.id === value
      );

      if (cantonSeleccionado) {
        updatedFormData.canton = cantonSeleccionado.canton;
        const cantones = await api.get(
          `/catalogos/parroquias?cantonId=${cantonSeleccionado.id}`
        );
        updatedFormData.ciudadParroquia = "";
        updatedFormData.disableCiudadParroquia = false;
        setciudadParroquias(cantones.data);
      }
    }

    // Parroquia
    if (name === "ciudadParroquiaId") {
      const parroquiaSeleccionada = ciudadParroquias.find(
        (c) => c.id === Number(value) || c.id === value
      );
      if (parroquiaSeleccionada) {
        updatedFormData.ciudadParroquia = parroquiaSeleccionada.parroquia || "";
      }
    }

    setFormData(updatedFormData);
  };

  const handleValidarRuc = async () => {
    setRucError("");
    setErrores("");
    setValidatingRuc(true);
    try {
      const response = await api.get(
        `/empresa/validar-ruc?ruc=${formData.ruc}`
      );
      const datos = response.data?.datos;
      const data = datos[0];

      setFormData({
        ...formData,
        razonSocial: data.razonSocial,
        estadoContribuyenteRuc: data.estadoContribuyenteRuc,
        actividadEconomicaPrincipal: data.actividadEconomicaPrincipal,
        tipoContribuyente: data.tipoContribuyente,
        regimen: data.regimen,
        categoria: data.categoria,
        fechaInicioActividades: formatFecha(
          data.informacionFechasContribuyente.fechaInicioActividades
        ),
      });
    } catch (err: any) {
      setFormData({
        ...formData,
        razonSocial: "",
        estadoContribuyenteRuc: "",
        actividadEconomicaPrincipal: "",
        tipoContribuyente: "",
        regimen: "",
        categoria: "",
        fechaInicioActividades: "",
      });
      const error = err.response?.data?.mensaje;
      setRucError(error);
    } finally {
      setValidatingRuc(false);
    }
  };

  const validarFormularioCompleto = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ruc) {
      newErrors.ruc = "El RUC es obligatorio.";
    } else if (!validateRucEcuador(formData.ruc)) {
      newErrors.ruc = "El RUC ingresado es incorrecto";
    }

    if (!formData.nombreComercial) {
      newErrors.nombreComercial = "El nombre comercial es obligatorio.";
    }

    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!isValidPhone(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos.";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }

    if (
      datosConfig?.color_primario &&
      !isValidHexColor(datosConfig.color_primario)
    ) {
      newErrors.color_primario = "Color primario inválido.";
    }

    if (
      datosConfig?.color_secundario &&
      !isValidHexColor(datosConfig.color_secundario)
    ) {
      newErrors.color_secundario = "Color secundario inválido.";
    }

    setErrores(newErrors);

    // Retorna true si no hay errores, false si los hay
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validarFormularioCompleto()) {
        return;
      }
      setError("");
      const dataToSend = {
        ...formData,
        color_primario: datosConfig?.color_primario || formData.color_primario,
        color_secundario:
          datosConfig?.color_secundario || formData.color_secundario,
        logo_url: datosConfig?.logo_url || formData.logo_url,
        fuente_personalizada:
          datosConfig?.fuente_personalizada || formData.fuente_personalizada,
      };
      const payload = mapFormDataToPayload(dataToSend);
      payload.categoria = "prueba";
      const response = await api.post("/empresa/registrar", payload);
      const empresaId = response.data.datos.empresaId;
      if (empresaId) {
        dispatch(setEmpresaId(empresaId));
        setEmpresaId(empresaId);
        navigate("/register/usuario");
      }
    } catch (err: any) {
      const error = err.response?.data?.mensaje;
      setError(error);
    }
  };

  const showConfiguracionVisual = () => {
    setFormData({
      ...formData,
      showConfigVisual: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Datos de la Empresa
          </Typography>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <DatosEmpresa
                formData={formData}
                handleChange={handleChange}
                handleValidarRuc={handleValidarRuc}
                rucError={rucError}
                validating={validatingRuc}
                errors={errores}
              />
            </Grid>
          </Paper>
        </Grid>

        {/* Divider */}
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>

        {/* Contacto y ubicación */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Contacto y Ubicación
          </Typography>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <DatosContactoGeografico
                formData={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                paises={paises}
                provinciaEstados={provinciaEstados}
                cantones={cantones}
                ciudadParroquias={ciudadParroquias}
                errors={errores}
              />
            </Grid>
          </Paper>
        </Grid>

        {/* Configuración visual */}
        {formData.showConfigVisual && (
          <>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Configuración Visual
              </Typography>
              <Paper elevation={0} sx={{ p: 3 }}>
                <ConfiguracionVisualForm
                  onChange={setDatosConfig}
                  errors={errores}
                />
              </Paper>
            </Grid>
          </>
        )}

        {/* Botón para agregar configuración visual */}
        {!formData.showConfigVisual && (
          <Grid size={{ xs: 12 }}>
            <Box textAlign="center">
              <Button variant="outlined" onClick={showConfiguracionVisual}>
                Agregar configuración visual
              </Button>
            </Box>
          </Grid>
        )}

        {/* Error general */}
        {error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Botón de registro */}
        <Grid size={{ xs: 12 }}>
          <Box textAlign="center" mt={2}>
            <PrimaryButton type="submit">Registrar Empresa</PrimaryButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmpresaRegisterForm;
