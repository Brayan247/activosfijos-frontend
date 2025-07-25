import React from "react";
import { TextField, Grid } from "@mui/material";

interface TextInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const TextInput = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText = "",
}: TextInputProps) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      type={type}
      name={name}
      label={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      size="small"
      margin="dense"
      InputProps={{
        sx: {
          borderRadius: "8px",
          height: "40px", // <-- altura total del campo
        },
      }}
      InputLabelProps={{
        sx: {
          fontSize: "0.85rem", // opcional, tamaño de label
        },
      }}
    />
  </Grid>
);

export default TextInput;
