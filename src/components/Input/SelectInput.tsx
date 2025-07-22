import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent, Grid } from "@mui/material";

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  name: string;
  label?: string;
  value: string | number;
  onChange: (e: SelectChangeEvent<string | number>) => void;
  options: Option[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  disabled = false,
}) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <FormControl fullWidth margin="normal" error={error} disabled={disabled}>
        {label && <InputLabel>{label}</InputLabel>}

        <Select name={name} value={value} onChange={onChange} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default SelectInput;
