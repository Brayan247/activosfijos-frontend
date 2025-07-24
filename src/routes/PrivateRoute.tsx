import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  children: JSX.Element;
  requireEmpresaId?: boolean;
}

export const PrivateRoute = ({ children, requireEmpresaId = false }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const empresaId = useSelector((state: RootState) => state.auth.empresaID);
  const location = useLocation();

  if (requireEmpresaId && !empresaId) {
    return <Navigate to="/register/empresa" replace />;
  }

  if (!requireEmpresaId && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
};
