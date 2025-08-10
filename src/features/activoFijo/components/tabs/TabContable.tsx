import React from "react";
import { Grid } from "@mui/material";
import { FTextField, FSelect } from "../FormControls";

interface Props { formData: any; onChange: (name: string, value: any) => void; selects: any; }

const TabContable: React.FC<Props> = ({ formData, onChange, selects }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Cuenta Contable Asociada" name="cuentaContable" value={formData.cuentaContable} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Centro de Costos" name="centroCostos" value={formData.centroCostos} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Depreciación Acumulada" name="depreciacionAcumulada" value={formData.depreciacionAcumulada} onChange={onChange} type="number" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Valor en Libros Actual" name="valorLibros" value={formData.valorLibros} onChange={onChange} type="number" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Fecha Última Depreciación" name="fechaUltimaDepreciacion" value={formData.fechaUltimaDepreciacion} onChange={onChange} type="date" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FSelect label="Estado de Depreciación" name="estadoDepreciacion" value={formData.estadoDepreciacion} onChange={onChange} options={selects.estadoDepreciacion} />
      </Grid>
    </>
  );
};

export default TabContable;
