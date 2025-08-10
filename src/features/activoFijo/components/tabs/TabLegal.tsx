import React from "react";
import { Grid } from "@mui/material";
import { FTextField } from "../FormControls";

interface Props { formData: any; onChange: (name: string, value: any) => void; proveedores: string[]; proveedorSeleccionado: string; setProveedorSeleccionado: (val: string) => void; }

const TabLegal: React.FC<Props> = ({ formData, onChange, proveedores, proveedorSeleccionado, setProveedorSeleccionado }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Número Legal / Placa" name="numeroLegal" value={formData.numeroLegal} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Seguro Asociado" name="seguro" value={formData.seguro} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Vencimiento del Seguro" name="vencimientoSeguro" value={formData.vencimientoSeguro} onChange={onChange} type="date" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Garantía (meses)" name="garantia" value={formData.garantia} onChange={onChange} type="number" />
      </Grid>
    </>
  );
};

export default TabLegal;
