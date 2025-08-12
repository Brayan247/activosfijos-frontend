import React from "react";
import { Grid, Typography } from "@mui/material";
import { FSelect, FTextField } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  frecuenciasMantenimiento: string[];
  frecuenciaMantenimientoSeleccionado: string;
  setFrecuenciaMantenimientoSeleccionado: (val: string) => void;
  tiposMantenimiento: string[];
  tipoMantenimientoSeleccionado: string;
  setTipoMantenimientoSeleccionado: (val: string) => void;
}

const TabMantenimiento: React.FC<Props> = ({
  formData,
  onChange,
  frecuenciasMantenimiento,
  frecuenciaMantenimientoSeleccionado,
  setFrecuenciaMantenimientoSeleccionado,
  tiposMantenimiento,
  tipoMantenimientoSeleccionado,
  setTipoMantenimientoSeleccionado,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Frecuencia de Mantenimiento"
          name="frecuenciaMantenimiento"
          value={frecuenciaMantenimientoSeleccionado}
          onChange={(_, v) => setFrecuenciaMantenimientoSeleccionado(v)}
          options={frecuenciasMantenimiento}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Tipo de Mantenimiento"
          name="tipoMantenimiento"
          value={tipoMantenimientoSeleccionado}
          onChange={(_, v) => setTipoMantenimientoSeleccionado(v)}
          options={tiposMantenimiento}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Proveedor de Mantenimiento"
          name="proveedorMantenimiento"
          value={formData.proveedorMantenimiento}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Costo Estimado"
          name="costoEstimado"
          value={formData.costoEstimado}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Próximo Mantenimiento"
          name="proximoMantenimiento"
          value={formData.proximoMantenimiento}
          onChange={onChange}
          type="date"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FTextField
          label="Observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={onChange}
          multiline
          minRows={2}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography>
          Historial de mantenimientos (ver módulo de histórico para CRUD
          completo)
        </Typography>
      </Grid>
    </>
  );
};

export default TabMantenimiento;
