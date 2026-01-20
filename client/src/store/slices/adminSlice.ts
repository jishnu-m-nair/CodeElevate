import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthAdminData } from "../../types/authTypes";

export interface AdminState {
  profile: AuthAdminData | null;
}

const initialState: AdminState = {
  profile: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminProfile: (state, action: PayloadAction<AuthAdminData>) => {
      state.profile = action.payload;
    },
    clearAdminProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setAdminProfile, clearAdminProfile } = adminSlice.actions;
export default adminSlice.reducer;
