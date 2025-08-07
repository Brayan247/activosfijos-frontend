// src/store/slices/dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardDto {
  usuarioId: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  rolId: number;
  idiomaPreferido: string;
  username: string;
  ultimoLogin: string | null;
  ipUltimoLogin: string | null;
  empresaId: number;
  nombreComercial: string;
  colorPrimario?: string;
  colorSecundario?: string;
  logoUrl?: string;
  temaOscuro?: boolean;
  fuentePersonalizada?: string;
}

interface DashboardState {
  data: DashboardDto | null;
}

const initialState: DashboardState = {
  data: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData(state, action: PayloadAction<DashboardDto>) {
      state.data = action.payload;
    },
    clearDashboardData(state) {
      state.data = null;
    },
  },
});

export const { setDashboardData, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
