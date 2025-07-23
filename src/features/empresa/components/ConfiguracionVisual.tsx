import { useState } from "react";
import { Grid, Button } from "@mui/material";
import TextInput from "../../../components/Input/TextInput";
import { theme } from "../../../style/theme";

interface ConfiguracionVisual {
  color_primario: string;
  color_secundario: string;
  logo_url: string;
  fuente_personalizada: string;
}

interface Props {
  onChange: (data: ConfiguracionVisual) => void;
  initialData?: ConfiguracionVisual;
}

const ConfiguracionVisualForm = ({ onChange, initialData }: Props) => {
  const [formData, setFormData] = useState<ConfiguracionVisual>({
    color_primario: initialData?.color_primario || theme.colors.primary,
    color_secundario: initialData?.color_secundario || theme.colors.secondary,
    logo_url: initialData?.logo_url || "",
    fuente_personalizada: initialData?.fuente_personalizada || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleGuardarConfig = () => {
    onChange(formData);
  };

  return (
    <Grid container spacing={2}>
      <TextInput
        name="color_primario"
        type="color"
        placeholder="Color Primario"
        value={formData.color_primario}
        onChange={handleChange}
      />

      <TextInput
        name="color_secundario"
        type="color"
        placeholder="Color Secundario"
        value={formData.color_secundario}
        onChange={handleChange}
      />

      <TextInput
        name="logo_url"
        type="text"
        placeholder="URL del Logo"
        value={formData.logo_url}
        onChange={handleChange}
      />

      <TextInput
        name="fuente_personalizada"
        placeholder="Fuente Personalizada"
        value={formData.fuente_personalizada}
        onChange={handleChange}
      />

      <Grid size={{xs:12}}>
        <Button variant="outlined" onClick={handleGuardarConfig}>Guardar Configuración</Button>
      </Grid>
    </Grid>
  );
};

export default ConfiguracionVisualForm;
