import { Box } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#0f0f0f", color: "white" }}>
        <Topbar />
        <Box sx={{ p: 3, overflowY: "auto", height: "calc(100vh - 64px)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
