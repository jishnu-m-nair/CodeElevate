import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthUserData } from '../../types/authTypes';

export interface UserState {
  profile: AuthUserData | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<AuthUserData>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
});


export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
