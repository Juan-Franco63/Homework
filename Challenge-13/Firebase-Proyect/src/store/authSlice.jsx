import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoUrl = payload.photoUrl || null;
      state.errorMessage = null;
    },
    
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoUrl = null;
      state.errorMessage = payload?.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    register: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoUrl = payload.photoUrl || null;
      state.errorMessage = null;
    }
  }
});

export const { login, logout, checkingCredentials, register} = authSlice.actions;

export default authSlice.reducer;
