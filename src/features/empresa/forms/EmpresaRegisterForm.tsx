import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Alert, Box, SelectChangeEvent, Button } from "@mui/material";

import TextInput from "../../../components/Input/TextInput";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import SelectInput from "../../../components/Input/SelectInput";

import ConfiguracionVisualForm from "./ConfiguracionVisual";

import api from "../../../services/axios";

const EmpresaRegisterForm = () => {
  interface Provincia {
    id: string | number;
    provincia: string;
  }

  interface Canton {
    id: string | number;
    canton: string;
  }

  interface ConfiguracionVisual {
    color_primario: string;
    color_secundario?: string;
    logo_url?: string;
    tema_oscuro?: boolean;
    fuente_personalizada?: string;
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ruc: "",
    razonSocial: "",
    estadoContribuyenteRuc: "",
    actividadEconomicaPrincipal: "",
    tipoContribuyente: "",
    regimen: "",
    categoria: "",
    fechaInicioActividades: "",
    nombreComercial: "",
    paisId: "",
    provinciaEstadoId: "",
    provinciaEstado: "",
    cantonId: "",
    canton: "",
    disableCanton: true,
    ciudadParroquia: "",
    disableCiudadParroquia: true,
    direccion: "",
    telefono: "",
    email: "",
    sitioWeb: "",
    showConfigVisual: false,
  });
  const [datosConfig, setDatosConfig] = useState<
    ConfiguracionVisual | undefined
  >();

  const [error, setError] = useState("");

  const [paises, setPaises] = useState([]);
  const [provinciaEstados, setprovinciaEstados] = useState<Provincia[]>([]);
  const [cantones, setCantones] = useState<Canton[]>([]);
  const [ciudadParroquias, setciudadParroquias] = useState([]);

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

    setFormData(updatedFormData);
  };

  const handleRucBlur = async () => {
    if (!formData.ruc) return;
    try {
      const response = await api.get(
        `/empresa/validar-ruc?ruc=${formData.ruc}`
      );
      const data = response.data.datos[0];
      setFormData({
        ...formData,
        razonSocial: data.razonSocial,
        estadoContribuyenteRuc: data.estadoContribuyenteRuc,
        actividadEconomicaPrincipal: data.actividadEconomicaPrincipal,
        tipoContribuyente: data.tipoContribuyente,
        regimen: data.regimen,
        categoria: data.categoria,
        fechaInicioActividades:
          data.informacionFechasContribuyente.fechaInicioActividades,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(datosConfig)
    e.preventDefault();
    setError("");
    try {
      await api.post("/empresa/registrar", formData);
      navigate("/configuracion-visual");
    } catch (err: any) {
      setError(err.response?.data?.mensaje || "Error al registrar la empresa.");
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
      <Grid container spacing={1}>
        <TextInput
          name="ruc"
          placeholder="RUC"
          value={formData.ruc}
          onChange={handleChange}
          onBlur={handleRucBlur}
        />
        <TextInput
          name="razonSocial"
          placeholder="Razón Social"
          value={formData.razonSocial || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="estadoContribuyenteRuc"
          placeholder="Estado de contribuyente"
          value={formData.estadoContribuyenteRuc || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="actividadEconomicaPrincipal"
          placeholder="Actividad economica principal"
          value={formData.actividadEconomicaPrincipal || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="tipoContribuyente"
          placeholder="Tipo de contribuyente"
          value={formData.tipoContribuyente || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="regimen"
          placeholder="Régimen"
          value={formData.regimen || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="fechaInicioActividades"
          placeholder="Fecha de inicio de actiivdades"
          value={formData.fechaInicioActividades || ""}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          name="nombreComercial"
          placeholder="Nombre Comercial"
          value={formData.nombreComercial}
          onChange={handleChange}
        />
        <TextInput
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        <SelectInput
          name="paisId"
          label="País"
          value={formData.paisId}
          onChange={handleSelectChange}
          options={paises.map((p: any) => ({
            value: p.id,
            label: p.nombre,
          }))}
          disabled={true}
        />
        <SelectInput
          name="provinciaEstadoId"
          label="Provincia o Estado"
          value={formData.provinciaEstadoId}
          onChange={handleSelectChange}
          options={provinciaEstados.map((p: any) => ({
            value: p.id,
            label: p.provincia,
          }))}
        />
        <SelectInput
          name="cantonId"
          label="Cantón"
          value={formData.cantonId}
          onChange={handleSelectChange}
          options={cantones.map((p: any) => ({
            value: p.id,
            label: p.canton,
          }))}
          disabled={formData.disableCanton}
        />
        <SelectInput
          name="ciudadParroquia"
          label="Ciudad o Parroquia"
          value={formData.ciudadParroquia}
          onChange={handleSelectChange}
          options={ciudadParroquias.map((p: any) => ({
            value: p.id,
            label: p.parroquia,
          }))}
          disabled={formData.disableCiudadParroquia}
        />
        <TextInput
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <TextInput
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          name="sitioWeb"
          placeholder="Sitio Web"
          value={formData.sitioWeb}
          onChange={handleChange}
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
