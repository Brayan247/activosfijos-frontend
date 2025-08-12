import React from "react";
import { Grid } from "@mui/material";
import { FTextField, FSelect } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  cuentaContable: string[];
  cuentaContableSeleccionada: string;
  setCuentaContableSeleccionada: (val: string) => void;
  centrosCostos: string[];
  centroCostoSeleccionado: string;
  setCentroCostoSeleccionado: (val: string) => void;
  selects: any;
}

const TabContable: React.FC<Props> = ({
  formData,
  onChange,
  selects,
  cuentaContable,
  cuentaContableSeleccionada,
  setCuentaContableSeleccionada,
  centrosCostos,
  centroCostoSeleccionado,
  setCentroCostoSeleccionado,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Cuenta Contable Asociada"
          name="cuentaContable"
          value={cuentaContableSeleccionada}
          onChange={(_, v) => setCuentaContableSeleccionada(v)}
          options={cuentaContable}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Centro de Costos"
          name="centroCostos"
          value={centroCostoSeleccionado}
          onChange={(_, v) => setCentroCostoSeleccionado(v)}
          options={centrosCostos}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Depreciación Acumulada"
          name="depreciacionAcumulada"
          value={formData.depreciacionAcumulada}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Valor en Libros Actual"
          name="valorLibros"
          value={formData.valorLibros}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Fecha Última Depreciación"
          name="fechaUltimaDepreciacion"
          value={formData.fechaUltimaDepreciacion}
          onChange={onChange}
          type="date"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Estado de Depreciación"
          name="estadoDepreciacion"
          value={formData.estadoDepreciacion}
          onChange={onChange}
          options={selects.estadoDepreciacion}
        />
      </Grid>
    </>
  );
};

export default TabContable;
