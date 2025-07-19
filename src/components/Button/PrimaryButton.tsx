import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const PrimaryButton = ({ onClick, children, type = "button" }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "0.75rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      width: "100%",
    }}
  >
    {children}
  </button>
);

export default PrimaryButton;
