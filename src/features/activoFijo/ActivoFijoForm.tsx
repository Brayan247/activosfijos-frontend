import React, { useState } from "react";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  SelectChangeEvent,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  OutlinedInput,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

interface OptionMap {
  [key: string]: string[];
}

const ActivoFijoForm: React.FC = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [proveedores] = useState(["Proveedor A", "Proveedor B", "Proveedor C"]);

  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const tabTitles = [
    "General",
    "Adquisición",
    "Ubicación",
    "Legal",
    "Garantia",
    "Mantenimiento",
    "Contable",
    "Baja",
    "Multimedia",
  ];

  const selects: OptionMap = {
    tipoActivoId: ["Mobiliario", "Vehículo", "Maquinaria", "Equipo de cómputo"],
    estadoActivoId: ["Activo", "Inactivo", "En mantenimiento"],
    categoriaContableId: ["Mobiliario de oficina", "Vehículos livianos"],
    metodoDepreciacionId: ["Lineal", "Suma de dígitos"],
    estadoDepreciacion: ["Activo", "Completamente depreciado"],
  };

  const [selectValues, setSelectValues] = useState<{ [key: string]: string }>(
    {}
  );

  const handleValidarRuc = () => {
    console.log("Validando RUC:", ruc);
  };

  const handleGuardarProveedor = () => {
    console.log("Guardando proveedor:", { ruc, razonSocial });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.name as string;
    setSelectValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentIndex < tabTitles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTabClick = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentIndex(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Formulario enviado (implementa envío real)");
  };

  const renderTabContent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                required
                label="Código del Activo"
                name="codigo"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                required
                label="Descripción"
                name="descripcion"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel id="tipoActivoLabel">Tipo de Activo</InputLabel>
                <Select
                  labelId="tipoActivoLabel"
                  name="tipoActivoId"
                  value={selectValues.tipoActivoId || ""}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Proveedor" />}
                >
                  {selects.tipoActivoId.map((option, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel id="estado-label">Estado</InputLabel>
                <Select
                  labelId="estado-label"
                  name="estadoActivoId"
                  value={selectValues.estadoActivoId || ""}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Proveedor" />}
                >
                  {selects.estadoActivoId.map((option, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel id="categoriaContableLabel">
                  Categoría Contable
                </InputLabel>
                <Select
                  labelId="categoriaContableLabel"
                  name="categoriaContableId"
                  value={selectValues.categoriaContableId || ""}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Proveedor" />}
                >
                  {selects.categoriaContableId.map((option, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Número de Serie" name="numeroSerie" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Marca" name="marca" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Modelo" name="modelo" />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Adquisición"
                name="fechaAdquisicion"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid
              display="flex"
              size={{ xs: 12, md: 6 }}
              container
              spacing={2}
              alignItems="center"
            >
              <Grid size={{ xs: 7 }}>
                <FormControl fullWidth>
                  <InputLabel id="proveedor-label">Proveedor</InputLabel>
                  <Select
                    labelId="proveedor-label"
                    value={proveedorSeleccionado}
                    onChange={(e) => setProveedorSeleccionado(e.target.value)}
                    input={<OutlinedInput label="Proveedor" />}
                  >
                    {proveedores.map((prov, index) => (
                      <MenuItem key={index} value={prov}>
                        {prov}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  Registrar proveedor
                </Button>
              </Grid>
            </Grid>

            {/* Dialog para registro de proveedor */}
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Registrar proveedor</DialogTitle>
              <DialogContent>
                <Box display="flex" gap={2} alignItems="center" mt={1}>
                  <Grid container spacing={2}>
                    {/* Fila RUC + Validar */}
                    <Grid size={{ xs: 8 }}>
                      <TextField
                        label="RUC"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Button
                        variant="outlined"
                        onClick={handleValidarRuc}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        Validar
                      </Button>
                    </Grid>

                    {/* Fila Razón Social + Guardar */}
                    <Grid size={{ xs: 8 }}>
                      <TextField
                        label="Razón Social"
                        value={razonSocial}
                        onChange={(e) => setRazonSocial(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Button
                        variant="contained"
                        onClick={handleGuardarProveedor}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cerrar</Button>
              </DialogActions>
            </Dialog>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Factura / Comprobante"
                name="factura"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Valor de Adquisición"
                name="valor"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Valor Residual"
                name="valorResidual"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Vida Útil (meses)"
                name="vidaUtil"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Método de Depreciación</InputLabel>
                <Select
                  name="metodoDepreciacionId"
                  value={selectValues.metodoDepreciacionId || ""}
                  onChange={handleSelectChange}
                >
                  {selects.metodoDepreciacionId.map((option, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Moneda"
                name="moneda"
                defaultValue="USD"
              />
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Ubicación" name="ubicacion" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Dirección" name="direccion" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Departamento/Zona"
                name="departamento"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Responsable" name="responsable" />
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Número Legal / Placa"
                name="numeroLegal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Seguro Asociado" name="seguro" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Vencimiento del Seguro"
                name="vencimientoSeguro"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Garantía (meses)"
                name="garantia"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="file"
                label="Documentos Adjuntos"
                name="documentosAdjuntos"
                inputProps={{ accept: "application/pdf", multiple: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        );
      case 4:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tiene Garantia Activa?"
                name="frecuenciaMantenimiento"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Inicio Garantia"
                name="inicioGarantia"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Fin Garantia"
                name="finGarantia"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="proveedor-label">
                  Proveedor de Garantia
                </InputLabel>
                <Select
                  labelId="proveedorGarantia-label"
                  value={proveedorSeleccionado}
                  onChange={(e) => setProveedorSeleccionado(e.target.value)}
                  input={<OutlinedInput label="Proveedor" />}
                >
                  {proveedores.map((prov, index) => (
                    <MenuItem key={index} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        );
      case 5:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Frecuencia de Mantenimiento"
                name="frecuenciaMantenimiento"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Próximo Mantenimiento"
                name="proximoMantenimiento"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Typography>Historial de mantenimientos</Typography>
          </>
        );
      case 6:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Cuenta Contable Asociada"
                name="cuentaContable"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Centro de Costos"
                name="centroCostos"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Depreciación Acumulada"
                name="depreciacionAcumulada"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Valor en Libros Actual"
                name="valorLibros"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Última Depreciación"
                name="fechaUltimaDepreciacion"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Estado de Depreciación</InputLabel>
                <Select
                  input={<OutlinedInput label="Estado de Depreciación" />}
                  name="estadoDepreciacion"
                  value={selectValues.estadoDepreciacion || ""}
                  onChange={handleSelectChange}
                >
                  {selects.estadoDepreciacion.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        );
      case 7:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Baja"
                name="fechaBaja"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Motivo de Baja" name="motivoBaja" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Valor de Recuperación"
                name="valorRecuperacion"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Destino Final" name="destinoFinal" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Responsable de Baja"
                name="responsableBaja"
              />
            </Grid>
          </>
        );
      case 8:
        return (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="file"
                label="Fotos del Activo"
                name="fotosActivo"
                inputProps={{ accept: "image/*", multiple: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="file"
                label="Documentos Adjuntos"
                name="documentosAdjuntos"
                inputProps={{ accept: "application/pdf", multiple: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Auditorías Realizadas"
                name="auditorias"
                multiline
                minRows={3}
              />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid spacing={2}>
      <Typography variant="h4" align="center" color="primary">
        Registro de Activos
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Tabs
            value={currentIndex}
            onChange={handleTabClick}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              px: 2,
              pt: 2,
              backgroundColor: theme.palette.background.default,
            }}
          >
            {tabTitles.map((title, index) => (
              <Tab key={index} label={title} />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {tabTitles[currentIndex]}
            </Typography>
            <Grid container spacing={2}>
              {renderTabContent()}
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                type="button"
                variant="contained"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                Anterior
              </Button>
              {currentIndex < tabTitles.length - 1 ? (
                <Button type="button" variant="contained" onClick={handleNext}>
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Registrar Activo
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default ActivoFijoForm;
