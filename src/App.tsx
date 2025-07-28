import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import Dashboard from "./features/dashboard/DashboardPage";
import Login from "./features/auth/LoginPage";
import RegisterEmpresaPage from "./features/empresa/RegisterEmpresaPage ";
import RegisterUsuarioPage from "./features/usuario/RegisterUsuarioPage";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
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
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
