// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  empresaID: number | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  empresaID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setEmpresaId: (state, action: PayloadAction<number>) => {
      state.empresaID = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, logout, setEmpresaId } = authSlice.actions;
export default authSlice.reducer;
