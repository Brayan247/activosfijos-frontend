import React from "react";
import { Grid, Typography } from "@mui/material";
import { FTextField, FSelect } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  selects: any;
}

const TabGeneral: React.FC<Props> = ({ formData, onChange, selects }) => {
  return (
    <>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Código del Activo" name="codigo" value={formData.codigo} onChange={onChange} required />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Descripción" name="descripcion" value={formData.descripcion} onChange={onChange} required />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FSelect label="Tipo de Activo" name="tipoActivoId" value={formData.tipoActivoId} onChange={onChange} options={selects.tipoActivoId} inputLabelId="tipoActivoLabel" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FSelect label="Estado" name="estadoActivoId" value={formData.estadoActivoId} onChange={onChange} options={selects.estadoActivoId} inputLabelId="estado-label" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FSelect label="Categoría Contable" name="categoriaContableId" value={formData.categoriaContableId} onChange={onChange} options={selects.categoriaContableId} inputLabelId="categoriaContableLabel" />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Número de Serie" name="numeroSerie" value={formData.numeroSerie} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Marca" name="marca" value={formData.marca} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <FTextField label="Modelo" name="modelo" value={formData.modelo} onChange={onChange} />
      </Grid>
      <Grid size={{xs:12}}>
        <Typography variant="body2" color="text.secondary">* Agrega notas técnicas si aplica (capacidad, año fabricación, etc.).</Typography>
      </Grid>
    </>
  );
};

export default TabGeneral;
