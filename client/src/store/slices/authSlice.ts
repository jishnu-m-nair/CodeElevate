import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  role: 'user' | 'recruiter' | 'admin' | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; role: AuthState['role'] | null }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
