import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    }}
  >
    {children}
  </div>
);

export default Card;
