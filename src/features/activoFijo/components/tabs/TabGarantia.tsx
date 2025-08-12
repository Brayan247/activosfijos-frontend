import React from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FSelect, FTextField } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
}

const TabGarantia: React.FC<Props> = ({
  formData,
  onChange,
}) => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Tiene Garantía Activa?</FormLabel>
          <RadioGroup
            row
            name="tieneGarantia"
            value={formData.tieneGarantia ? "true" : "false"}
            onChange={(e) =>
              onChange("tieneGarantia", e.target.value === "true")
            }
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {formData.tieneGarantia === true && (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <FTextField
              label="Inicio Garantía"
              name="inicioGarantia"
              value={formData.inicioGarantia}
              onChange={onChange}
              type="date"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FTextField
              label="Fin Garantía"
              name="finGarantia"
              value={formData.finGarantia}
              onChange={onChange}
              type="date"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FTextField
              label="Proveedor de Garantia"
              name="proveedorGarantia"
              value={formData.proveedorGarantia}
              onChange={onChange}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default TabGarantia;
