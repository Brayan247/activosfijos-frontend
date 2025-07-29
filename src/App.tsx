import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./features/dashboard/DashboardPage";
import Login from "./features/auth/LoginPage";
import RegisterEmpresaPage from "./features/empresa/RegisterEmpresaPage ";
import RegisterUsuarioPage from "./features/usuario/RegisterUsuarioPage";
import NuevaOrdenPage from "./features/ordenes/NuevaOrdenPage";
import VerificacionOrdenPage from "./features/ordenes/VerificacionOrdenPage";
import OrdenesAprobadasPage from "./features/ordenes/OrdenesAprobadasPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/empresa" element={<RegisterEmpresaPage />} />
          <Route
            path="/register/usuario"
            element={
              <PrivateRoute requireEmpresaId={true}>
                <RegisterUsuarioPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="ordenes/nueva" element={<NuevaOrdenPage />} />
            <Route
              path="ordenes/verificacion"
              element={<VerificacionOrdenPage />}
            />
            <Route
              path="ordenes/aprobadas"
              element={<OrdenesAprobadasPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
