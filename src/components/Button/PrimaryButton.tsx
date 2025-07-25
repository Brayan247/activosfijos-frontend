import React from "react";
import { Button, ButtonProps as MuiButtonProps  } from "@mui/material";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  variant?: MuiButtonProps["variant"];
}

const PrimaryButton = ({
  onClick,
  children,
  type = "button",
  disabled = false,
  loading = false,
  variant = "contained"
}: ButtonProps) => (
  <Button
    type={type}
    onClick={onClick}
    variant={variant}
    disabled={disabled || loading}
    size="medium"
    sx={{
      textTransform: "none",      // No mayúsculas forzadas
      fontWeight: 500,            // Peso medio
      fontSize: "0.95rem",        // Tamaño legible
      borderRadius: "6px",        // Bordes sutiles
      paddingY: 1,                // Altura adecuada, no exagerada
      boxShadow: "none",          // Sin sombra
    }}
  >
    {loading ? "Procesando..." : children}
  </Button>
);

export default PrimaryButton;
