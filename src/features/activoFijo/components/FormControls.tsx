import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  SelectProps,
  Typography,
} from "@mui/material";

interface FTextFieldProps {
  label: string;
  name: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
  type?: string;
  fullWidth?: boolean;
  required?: boolean;
  inputProps?: any;
  multiline?: boolean;
  minRows?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const FTextField: React.FC<FTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  fullWidth = true,
  required = false,
  inputProps,
  multiline = false,
  minRows,
  disabled,
  error = false,
  helperText = "",
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      label={label}
      name={name}
      value={value ?? ""}
      onChange={(e) => onChange && onChange(name, e.target.value)}
      type={type}
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
      inputProps={inputProps}
      multiline={multiline}
      minRows={minRows}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};

interface FSelectProps {
  label: string;
  name: string;
  value?: string | number;
  onChange?: (name: string, value: any) => void;
  options: string[] | { label: string; value: any }[];
  required?: boolean;
  inputLabelId?: string;
  input?: SelectProps["input"];
  error?: boolean;
  helperText?: string;
}

export const FSelect: React.FC<FSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  inputLabelId,
  input,
  error = false,
  helperText = "",
}) => {
  const handleChange = (e: SelectChangeEvent<any>) => {
    onChange && onChange(name, e.target.value);
  };

  return (
    <FormControl fullWidth required={required} error={error}>
      <InputLabel id={inputLabelId}>{label}</InputLabel>
      <Select
        labelId={inputLabelId}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        input={input ?? <OutlinedInput label={label} />}
      >
        {options.map((opt: any, idx: number) => {
          if (typeof opt === "string")
            return (
              <MenuItem key={idx} value={idx + 1}>
                {opt}
              </MenuItem>
            );
          return (
            <MenuItem key={idx} value={opt.value}>
              {opt.label}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && (
        <Typography color="error">
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};
