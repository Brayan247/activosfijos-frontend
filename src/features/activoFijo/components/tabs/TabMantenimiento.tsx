import React from "react";
import { Grid, Typography } from "@mui/material";
import { FTextField } from "../FormControls";

interface Props { formData: any; onChange: (name: string, value: any) => void; }

const TabMantenimiento: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Frecuencia de Mantenimiento" name="frecuenciaMantenimiento" value={formData.frecuenciaMantenimiento} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Próximo Mantenimiento" name="proximoMantenimiento" value={formData.proximoMantenimiento} onChange={onChange} type="date" />
      </Grid>
      <Grid size={{xs:12}}>
        <Typography>Historial de mantenimientos (ver módulo de histórico para CRUD completo)</Typography>
      </Grid>
    </>
  );
};

export default TabMantenimiento;
