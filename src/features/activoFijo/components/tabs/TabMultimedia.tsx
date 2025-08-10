import React from "react";
import { Grid } from "@mui/material";
import { FTextField } from "../FormControls";

interface Props {
  formData: any;
  onChange: (name: string, value: any) => void;
  handleFileChange: (name: string, files: FileList | null) => void;
}

const TabMultimedia: React.FC<Props> = ({
  formData,
  onChange,
  handleFileChange,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <label
          htmlFor="fotosActivo"
          style={{ display: "block", marginBottom: 8 }}
        >
          Fotos del Activo
        </label>
        <input
          accept="image/*"
          id="fotosActivo"
          multiple
          type="file"
          onChange={(e) => handleFileChange("fotosActivo", e.target.files)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <label
          htmlFor="documentosAdjuntos"
          style={{ display: "block", marginBottom: 8 }}
        >
          Documento Adjunto
        </label>
        <input
          accept="application/pdf"
          id="documentosAdjuntos"
          multiple
          type="file"
          onChange={(e) =>
            handleFileChange("documentosAdjuntos", e.target.files)
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FTextField
          label="Auditorías Realizadas"
          name="auditorias"
          value={formData.auditorias}
          onChange={onChange}
          multiline
          minRows={3}
        />
      </Grid>
    </>
  );
};

export default TabMultimedia;
