import { useState, useEffect } from "react";
import { Grid, Alert, Box, SelectChangeEvent, Button } from "@mui/material";

import PrimaryButton from "../../../components/Button/PrimaryButton";

import DatosEmpresa from "./DatosGenerales";
import DatosContactoGeografico from "./DatosContactoGeografico";
import ConfiguracionVisualForm from "./ConfiguracionVisual";

import api from "../../../services/axios";
import formatFecha from "../../../utils/Helpers";
import mapFormDataToPayload from "../../../types/EmpresaFormData";

import {
  EmpresaFormData,
  initialFormData,
} from "../../../types/EmpresaFormData";

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

  const [formData, setFormData] = useState<EmpresaFormData>(initialFormData);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    console.log(payload);
    try {
      await api.post("/empresa/registrar", payload);
    } catch (err: any) {
      const error = err.response?.data?.mensaje;
      setRucError(error);
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
      <Grid container spacing={2}>
        <DatosEmpresa
          formData={formData}
          handleChange={handleChange}
          handleValidarRuc={handleValidarRuc}
          rucError={rucError}
          validating={validatingRuc}
        />
        <DatosContactoGeografico
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          paises={paises}
          provinciaEstados={provinciaEstados}
          cantones={cantones}
          ciudadParroquias={ciudadParroquias}
        />
      </Grid>
      {formData.showConfigVisual && (
        <ConfiguracionVisualForm onChange={(data) => setDatosConfig(data)} />
      )}
      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {!formData.showConfigVisual && (
        <Box mt={2}>
          <Button variant="outlined" onClick={showConfiguracionVisual}>
            Agregar configuracion visual
          </Button>
        </Box>
      )}
      <Box mt={4} textAlign="center">
        <PrimaryButton type="submit">Registrar Empresa</PrimaryButton>
      </Box>
    </form>
  );
};

export default EmpresaRegisterForm;
