import { Grid, Button } from "@mui/material";

import TextInput from "../../../components/Input/TextInput";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { EmpresaFormData } from "../../../types/EmpresaFormData";

interface Errors {
  ruc?: string;
  nombreComercial?: string;
  [key: string]: string | undefined; // para cualquier otro campo
}

interface DatosEmpresaProps {
  formData: EmpresaFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidarRuc: () => void;
  rucError: string | null;
  validating: boolean;
  errors: Errors;
}

const DatosEmpresa = ({
  formData,
  handleChange,
  handleValidarRuc,
  rucError,
  validating,
  errors,
}: DatosEmpresaProps) => {
  return (
    <>
      <TextInput
        name="ruc"
        placeholder="RUC"
        value={formData.ruc}
        onChange={handleChange}
        error={!!rucError || !!errors.ruc}
        helperText={rucError || errors.ruc}
      />
      <Grid size={{ xs: 12, md: 6 }} alignContent={"center"}>
        <PrimaryButton onClick={handleValidarRuc} disabled={validating}>{validating ? "Validando..." : "Validar ruc"}</PrimaryButton>
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
        error={!!errors.telefono}
        helperText={errors.telefono}
      />
    </>
  );
};

export default DatosEmpresa;
