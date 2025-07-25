import { useState, useEffect } from "react";
import { Grid, Box, Alert, Typography, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import { useNavigate } from "react-router-dom";

import TextInput from "../../../components/Input/TextInput";
import SelectInput from "../../../components/Input/SelectInput";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import api from "../../../services/axios";

import {
  UsuarioFormData,
  initialUsuarioFormData,
} from "../../../types/UsuarioFormData";
import mapFormDataToPayload from "../../../types/UsuarioFormData";

const UsuarioRegisterForm = () => {
  interface Opcion {
    id: string | number;
    nombre?: string;
    provincia: string;
    canton: string;
    parroquia: string;
  }

  const [formData, setFormData] = useState<UsuarioFormData>({
    ...initialUsuarioFormData,
    confirmPassword: "",
  });

  const empresaId = useSelector((state: RootState) => state.auth.empresaID);

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>("");

  const [paises, setPaises] = useState<Opcion[]>([]);
  const [provinciaEstados, setProvinciaEstados] = useState<Opcion[]>([]);
  const [cantones, setCantones] = useState<Opcion[]>([]);
  const [ciudadParroquias, setciudadParroquias] = useState<Opcion[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paises, provincias] = await Promise.all([
          api.get("/catalogos/paises"),
          api.get("/catalogos/provincias"),
        ]);
        setPaises(paises.data);
        setProvinciaEstados(provincias.data);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = async (e: SelectChangeEvent<string | number>) => {
    const name = e.target.name as keyof typeof formData;
    const value = e.target.value;

    let updatedFormData = {
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value),
    };

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

  const validarFormulario = () => {
    const erroresTemp: Record<string, string> = {};
    if (!formData.dni) erroresTemp.dni = "El DNI es obligatorio.";
    if (!formData.nombre) erroresTemp.nombre = "El nombre es obligatorio.";
    if (!formData.apellido)
      erroresTemp.apellido = "El apellido es obligatorio.";
    if (!formData.fechaNacimiento)
      erroresTemp.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    if (!formData.genero) erroresTemp.genero = "El género es obligatorio.";
    if (!formData.email) erroresTemp.email = "El correo es obligatorio.";
    if (!formData.username) erroresTemp.username = "El usuario es obligatorio.";
    if (!formData.password)
      erroresTemp.password = "La contraseña es obligatoria.";
    if (!formData.confirmPassword)
      erroresTemp.confirmPassword = "Confirma la contraseña.";
    else if (formData.password !== formData.confirmPassword) {
      erroresTemp.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      const payload = mapFormDataToPayload({
        ...formData,
        empresaId,
      });
      await api.post("/usuario/registrar", payload);
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.mensaje || "Error en el registro.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Datos generales
          </Typography>
        </Grid>
        <TextInput
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          placeholder="DNI"
          error={!!errores.dni}
          helperText={errores.dni}
        />
        <TextInput
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          error={!!errores.nombre}
          helperText={errores.nombre}
        />
        <TextInput
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          error={!!errores.apellido}
          helperText={errores.apellido}
        />

        <TextInput
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          error={!!errores.fechaNacimiento}
          helperText={errores.fechaNacimiento}
        />

        <SelectInput
          name="genero"
          label="Género"
          value={formData.genero}
          onChange={handleSelectChange}
          options={[
            { value: 1, label: "Masculino" },
            { value: 2, label: "Femenino" },
            { value: 3, label: "Otro" },
          ]}
          error={!!errores.genero}
          helperText={errores.genero}
        />

        <TextInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          error={!!errores.email}
          helperText={errores.email}
        />
        <SelectInput
          name="paisId"
          label="País"
          value={formData.paisId}
          onChange={handleSelectChange}
          options={paises.map((p) => ({
            value: p.id,
            label: p.nombre || "",
          }))}
          disabled={true}
        />
        <SelectInput
          name="provinciaEstadoId"
          label="Provincia o Estado"
          value={formData.provinciaEstadoId}
          onChange={handleSelectChange}
          options={provinciaEstados.map((p) => ({
            value: p.id,
            label: p.provincia || "",
          }))}
        />
        <SelectInput
          name="cantonId"
          label="Cantón"
          value={formData.cantonId}
          onChange={handleSelectChange}
          options={cantones.map((c) => ({
            value: c.id,
            label: c.canton || "",
          }))}
          disabled={formData.disableCanton}
        />
        <SelectInput
          name="ciudadParroquiaId"
          label="Ciudad o Parroquia"
          value={formData.ciudadParroquiaId}
          onChange={handleSelectChange}
          options={ciudadParroquias.map((c) => ({
            value: c.id,
            label: c.parroquia || "",
          }))}
          disabled={formData.disableCiudadParroquia}
        />
        <TextInput
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom mt={4}>
            Datos de usuario
          </Typography>
        </Grid>

        <TextInput
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          error={!!errores.username}
          helperText={errores.username}
        />
        <TextInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          error={!!errores.password}
          helperText={errores.password}
        />
        <TextInput
          name="confirmPassword"
          value={formData.confirmPassword || ""}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
          type="password"
          error={!!errores.confirmPassword}
          helperText={errores.confirmPassword}
        />
      </Grid>

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Box mt={2} textAlign="center">
        <PrimaryButton type="submit">Registrar Usuario</PrimaryButton>
      </Box>
    </form>
  );
};

export default UsuarioRegisterForm;
