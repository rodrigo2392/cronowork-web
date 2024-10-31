import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null
}
const initialState: AuthState = {
  token: null,
  user: null
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.token = null;
    }
  }
});

export const { signIn, signOut } = authSlice.actions;
export const selectToken = (state: RootState) => state.authState.token;
export default authSlice.reducer;
