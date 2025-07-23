import { Grid, Button } from "@mui/material";

import TextInput from "../../../components/Input/TextInput";
import { EmpresaFormData } from "../../../types/EmpresaFormData";

interface DatosEmpresaProps {
  formData: EmpresaFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidarRuc: () => void;
  rucError: string | null;
  validating: boolean;
}

const DatosEmpresa = ({
  formData,
  handleChange,
  handleValidarRuc,
  rucError,
  validating
}: DatosEmpresaProps) => {
  return (
    <>
      <TextInput
        name="ruc"
        placeholder="RUC"
        value={formData.ruc}
        onChange={handleChange}
        error={!!rucError}
        helperText={rucError ?? undefined}
      />
      <Grid size={{ xs: 12, md: 6 }} alignContent={"center"}>
        <Button
          variant="contained"
          onClick={handleValidarRuc}
          disabled={validating}
        >
          {validating ? "Validando..." : "Validar RUC"}
        </Button>
      </Grid>
      <TextInput
        name="razonSocial"
        placeholder="Razón Social"
        value={formData.razonSocial || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="estadoContribuyenteRuc"
        placeholder="Estado de contribuyente"
        value={formData.estadoContribuyenteRuc || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="actividadEconomicaPrincipal"
        placeholder="Actividad economica principal"
        value={formData.actividadEconomicaPrincipal || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="tipoContribuyente"
        placeholder="Tipo de contribuyente"
        value={formData.tipoContribuyente || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="regimen"
        placeholder="Régimen"
        value={formData.regimen || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="categoria"
        placeholder="Categoría"
        value={formData.categoria || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="fechaInicioActividades"
        placeholder="Fecha de inicio de actiivdades"
        value={formData.fechaInicioActividades || ""}
        onChange={handleChange}
        disabled={true}
      />
      <TextInput
        name="nombreComercial"
        placeholder="Nombre Comercial"
        value={formData.nombreComercial}
        onChange={handleChange}
      />
    </>
  );
};

export default DatosEmpresa;
