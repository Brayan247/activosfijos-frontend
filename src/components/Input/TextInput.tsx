import React from "react";

interface TextInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ name, type = "text", placeholder, value, onChange }: TextInputProps) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    style={{
      padding: "0.75rem 1rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      width: "100%",
    }}
  />
);

export default TextInput;
