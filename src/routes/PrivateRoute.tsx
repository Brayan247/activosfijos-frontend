import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};