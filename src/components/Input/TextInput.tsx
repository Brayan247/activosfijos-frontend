import React from "react";
import TextField from "@mui/material/TextField";

interface TextInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const TextInput = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
}: TextInputProps) => (
  <TextField
    fullWidth
    type={type}
    name={name}
    label={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    required={required}
    disabled={disabled}
    margin="normal"
  />
);

export default TextInput;