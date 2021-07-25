import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from './action-types';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface State {
  isLoggedIn: Boolean;
  logging: Boolean;
  currentUser: User | null;
}

const initialState: State = {
  isLoggedIn: false,
  logging: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [LOGIN]: (state, actions: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    [LOGIN_SUCCESS]: (state, actions: PayloadAction<User>) => {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = actions.payload;
    },
    [LOGIN_FAILED]: (state, actions: PayloadAction<string>) => {
      state.logging = false;
      state.isLoggedIn = false;
    },
    [LOGOUT]: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selector = (state: any) => state.auth

// Reducers
const authReducers = authSlice.reducer
export default authReducers;
