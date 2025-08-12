import React from "react";
import { Grid } from "@mui/material";
import { FSelect, FTextField } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  motivosBaja: string[];
  motivoBajaSeleccionado: string;
  setMotivoBajaSeleccionado: (val: string) => void;
}

const TabBaja: React.FC<Props> = ({
  formData,
  onChange,
  motivosBaja,
  motivoBajaSeleccionado,
  setMotivoBajaSeleccionado,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Fecha de Baja"
          name="fechaBaja"
          value={formData.fechaBaja}
          onChange={onChange}
          type="date"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Motivo de Baja"
          name="motivoBaja"
          value={motivoBajaSeleccionado}
          onChange={(_, v) => setMotivoBajaSeleccionado(v)}
          options={motivosBaja}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Valor de Recuperación"
          name="valorRecuperacion"
          value={formData.valorRecuperacion}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Destino Final"
          name="destinoFinal"
          value={formData.destinoFinal}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Responsable de Baja"
          name="responsableBaja"
          value={formData.responsableBaja}
          onChange={onChange}
        />
      </Grid>
    </>
  );
};

export default TabBaja;
