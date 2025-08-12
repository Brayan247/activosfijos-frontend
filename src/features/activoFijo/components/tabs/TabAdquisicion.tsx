import React from "react";
import { Grid, Button } from "@mui/material";
import { FTextField, FSelect } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  proveedores: string[];
  proveedorSeleccionado: string;
  setProveedorSeleccionado: (val: string) => void;
  metodosDepreciacion: string[];
  metodoDepreciacionSeleccionado: string;
  setMetodoDepreciacionSeleccionado: (val: string) => void;
  monedas: string[];
  monedaSeleccionada: string;
  setMonedaSeleccionada: (val: string) => void;
  abrirRegistrarProveedor: () => void;
}

const TabAdquisicion: React.FC<Props> = ({
  formData,
  onChange,
  proveedores,
  proveedorSeleccionado,
  setProveedorSeleccionado,
  metodosDepreciacion,
  metodoDepreciacionSeleccionado,
  setMetodoDepreciacionSeleccionado,
  monedas,
  monedaSeleccionada,
  setMonedaSeleccionada,
  abrirRegistrarProveedor,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Fecha de Adquisición"
          name="fechaAdquisicion"
          value={formData.fechaAdquisicion}
          onChange={onChange}
          type="date"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} container spacing={2} alignItems="center">
        <Grid size={{ xs: 7 }}>
          <FSelect
            label="Proveedor"
            name="proveedor"
            value={proveedorSeleccionado}
            onChange={(_, v) => setProveedorSeleccionado(v)}
            options={proveedores}
          />
        </Grid>
        <Grid size={{ xs: 5 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={abrirRegistrarProveedor}
          >
            Registrar proveedor
          </Button>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Factura / Comprobante"
          name="factura"
          value={formData.factura}
          onChange={onChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Valor de Adquisición"
          name="valor"
          value={formData.valor}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Valor Residual"
          name="valorResidual"
          value={formData.valorResidual}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FTextField
          label="Vida Útil (meses)"
          name="vidaUtil"
          value={formData.vidaUtil}
          onChange={onChange}
          type="number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FSelect
          label="Método de Depreciación"
          name="metodoDepreciacion"
          value={metodoDepreciacionSeleccionado}
          onChange={(_, v) => setMetodoDepreciacionSeleccionado(v)}
          options={metodosDepreciacion}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {" "}
        <FSelect
          label="Moneda"
          name="moneda"
          value={monedaSeleccionada}
          onChange={(_, v) => setMonedaSeleccionada(v)}
          options={monedas}
        />
      </Grid>
    </>
  );
};

export default TabAdquisicion;
