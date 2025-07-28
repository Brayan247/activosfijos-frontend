import { useState } from "react";
import { Grid, Button, useTheme } from "@mui/material";
import TextInput from "../../../components/Input/TextInput";



interface ConfiguracionVisual {
  color_primario: string;
  color_secundario: string;
  logo_url: string;
  fuente_personalizada: string;
}

interface Errors {
  color_primario?: string;
  color_secundario?: string;
  logo_url?: string;
  [key: string]: string | undefined; // para cualquier otro campo
}

interface Props {
  onChange: (data: ConfiguracionVisual) => void;
  initialData?: ConfiguracionVisual;
  errors: Errors;
}

const ConfiguracionVisualForm = ({ onChange, initialData, errors }: Props) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<ConfiguracionVisual>({
    color_primario: initialData?.color_primario || theme.palette.background.default,
    color_secundario: initialData?.color_secundario || theme.palette.primary.main,
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
        error={!!errors.color_primario}
        helperText={errors.color_primario}
      />

      <TextInput
        name="color_secundario"
        type="color"
        placeholder="Color Secundario"
        value={formData.color_secundario}
        onChange={handleChange}
        error={!!errors.color_secundario}
        helperText={errors.color_secundario}
      />

      <TextInput
        name="logo_url"
        type="text"
        placeholder="URL del Logo"
        value={formData.logo_url}
        onChange={handleChange}
        error={!!errors.logo_url}
        helperText={errors.logo_url}
      />

      <TextInput
        name="fuente_personalizada"
        placeholder="Fuente Personalizada"
        value={formData.fuente_personalizada}
        onChange={handleChange}
      />

      <Grid size={{ xs: 12 }}>
        <Button variant="outlined" onClick={handleGuardarConfig}>
          Guardar Configuración
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConfiguracionVisualForm;
