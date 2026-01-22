import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthRecruiterData } from "../../types/authTypes";

export interface RecruiterState {
  profile: AuthRecruiterData | null;
}

const initialState: RecruiterState = {
  profile: null,
};

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    setRecruiterProfile: (state, action: PayloadAction<AuthRecruiterData>) => {
      state.profile = action.payload;
    },
    clearRecruiterProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setRecruiterProfile, clearRecruiterProfile } =
  recruiterSlice.actions;
export default recruiterSlice.reducer;
