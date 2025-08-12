import React from "react";
import { Grid, Typography } from "@mui/material";
import { FTextField, FSelect } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  tipoActivos: string[];
  tipoActivoSeleccionado: string;
  setTipoActivoSeleccionado: (val: string) => void;
  estadoActivos: string[];
  estadoActivoSeleccionado: string;
  setEstadoActivoSeleccionado: (val: string) => void;
  categoriaContable: string[];
  categoriaContableSeleccionado: string;
  setCategoriaContableSeleccionado: (val: string) => void;
}

const TabGeneral: React.FC<Props> = ({
  formData,
  onChange,
  tipoActivos,
  tipoActivoSeleccionado,
  setTipoActivoSeleccionado,
  estadoActivos,
  estadoActivoSeleccionado,
  setEstadoActivoSeleccionado,
  categoriaContable,
  categoriaContableSeleccionado,
  setCategoriaContableSeleccionado,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={onChange}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Tipo de Activo"
          name="tipoActivo"
          value={tipoActivoSeleccionado}
          onChange={(_, v) => setTipoActivoSeleccionado(v)}
          options={tipoActivos}
          inputLabelId="tipoActivoLabel"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Estado"
          name="estadoActivo"
          value={estadoActivoSeleccionado}
          onChange={(_, v) => setEstadoActivoSeleccionado(v)}
          options={estadoActivos}
          inputLabelId="estado-label"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Categoría Contable"
          name="categoriaContable"
          value={categoriaContableSeleccionado}
          onChange={(_, v) => setCategoriaContableSeleccionado(v)}
          options={categoriaContable}
          inputLabelId="categoriaContableLabel"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Número de Serie"
          name="numeroSerie"
          value={formData.numeroSerie}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Marca"
          name="marca"
          value={formData.marca}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="body2" color="text.secondary">
          * Agrega notas técnicas si aplica (capacidad, año fabricación, etc.).
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FTextField
          label="Notas técnicas"
          name="notasTecnicas"
          value={formData.notasTecnicas}
          onChange={onChange}
          multiline
          minRows={4}
        />
      </Grid>
    </>
  );
};

export default TabGeneral;
