import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const PrimaryButton = ({ onClick, children, type = "button" }: ButtonProps) => (
  <Button
    type={type}
    onClick={onClick}
    variant="contained"
    fullWidth
    sx={{ paddingY: 1.5, fontWeight: "bold", fontSize: "1rem" }}
  >
    {children}
  </Button>
);

export default PrimaryButton;