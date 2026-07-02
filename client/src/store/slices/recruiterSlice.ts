import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthRecruiterData } from "../../types/authTypes";
import type { RecruiterProfile } from "../../types/recruiterTypes";

export interface RecruiterState {
  profile: RecruiterProfile | null;
}

const initialState: RecruiterState = {
  profile: null,
};

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    setRecruiterProfile: (
      state,
      action: PayloadAction<RecruiterProfile>
    ) => {
      console.log("Reducer payload:", action.payload);
      state.profile = action.payload;
    },

    updateRecruiterProfile: (
      state,
      action: PayloadAction<Partial<AuthRecruiterData>>
    ) => {
      if (!state.profile) return;

      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },

    clearRecruiterProfile: (state) => {
      state.profile = null;
    },
  },
});

export const {
  setRecruiterProfile,
  updateRecruiterProfile,
  clearRecruiterProfile,
} = recruiterSlice.actions;

export default recruiterSlice.reducer;