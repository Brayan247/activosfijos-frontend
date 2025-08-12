import React from "react";
import { Grid } from "@mui/material";
import { FSelect, FTextField } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  departamentos: string[];
  departamentoSeleccionado: string;
  setDepartamentoSeleccionado: (val: string) => void;
}

const TabUbicacion: React.FC<Props> = ({
  formData,
  onChange,
  departamentos,
  departamentoSeleccionado,
  setDepartamentoSeleccionado,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Ubicación"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Departamento/Zona"
          name="departamento"
          value={departamentoSeleccionado}
          onChange={(_, v) => setDepartamentoSeleccionado(v)}
          options={departamentos}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Responsable"
          name="responsable"
          value={formData.responsable}
          onChange={onChange}
        />
      </Grid>
    </>
  );
};

export default TabUbicacion;
