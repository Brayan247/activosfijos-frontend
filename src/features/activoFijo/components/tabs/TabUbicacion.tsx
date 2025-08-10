import React from "react";
import { Grid } from "@mui/material";
import { FTextField } from "../FormControls";

interface Props { formData: any; onChange: (name: string, value: any) => void; }

const TabUbicacion: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Ubicación" name="ubicacion" value={formData.ubicacion} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Dirección" name="direccion" value={formData.direccion} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Departamento/Zona" name="departamento" value={formData.departamento} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Responsable" name="responsable" value={formData.responsable} onChange={onChange} />
      </Grid>
    </>
  );
};

export default TabUbicacion;
