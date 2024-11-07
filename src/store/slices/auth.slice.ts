import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface User {
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  refresh_token: string | null;
  user?: User | null
}
const initialState: AuthState = {
  token: null,
  refresh_token: null,
  user: null
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.token = null;
    },
    refreshToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },
  }
});

export const { signIn, signOut, refreshToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.authState.token;
export const selectUser = (state: RootState) => state.authState.user;
export default authSlice.reducer;
