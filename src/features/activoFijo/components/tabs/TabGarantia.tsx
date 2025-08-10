import React from "react";
import { Grid } from "@mui/material";
import { FTextField } from "../FormControls";

interface Props { formData: any; onChange: (name: string, value: any) => void; proveedores: string[]; proveedorSeleccionado: string; setProveedorSeleccionado: (val: string) => void; selects: any; }

const TabGarantia: React.FC<Props> = ({ formData, onChange, proveedores, proveedorSeleccionado, setProveedorSeleccionado }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Tiene Garantía Activa?" name="tieneGarantia" value={formData.tieneGarantia} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Inicio Garantía" name="inicioGarantia" value={formData.inicioGarantia} onChange={onChange} type="date" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Fin Garantía" name="finGarantia" value={formData.finGarantia} onChange={onChange} type="date" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FormProviderSelect proveedores={proveedores} proveedorSeleccionado={proveedorSeleccionado} setProveedorSeleccionado={setProveedorSeleccionado} />
      </Grid>
    </>
  );
};

const FormProviderSelect: React.FC<any> = ({ proveedores, proveedorSeleccionado, setProveedorSeleccionado }) => {
  // pequeño wrapper para no reimportar MUI
  return (
    <select
      name="proveedorGarantia"
      value={proveedorSeleccionado}
      onChange={(e) => setProveedorSeleccionado(e.target.value)}
      style={{ width: "100%", padding: "12px", borderRadius: 4 }}
    >
      <option value="">Seleccione proveedor</option>
      {proveedores.map((p: string, i: number) => <option key={i} value={p}>{p}</option>)}
    </select>
  );
};

export default TabGarantia;
