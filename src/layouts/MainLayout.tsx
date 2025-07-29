import { Box, useTheme } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, bgcolor: theme.palette.background.paper, color: "white", overflowY: "auto", p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
