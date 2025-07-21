import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Card = ({ children }: { children: React.ReactNode }) => (
  <MuiCard sx={{ borderRadius: 3, boxShadow: 3 }}>
    <CardContent>
      {children}
    </CardContent>
  </MuiCard>
);

export default Card;