import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { login } from './login.actions';
import { loginRepository } from '../loginRepository';

export interface LoginState {
  accessToken: string;
  refreshToken?: string;
  status: 'idle' | 'loading' | 'failed' | 'fulfilled';
}

const initialState: LoginState = {
  accessToken: loginRepository.getAccessToken() || '',
  status: 'idle',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.accessToken = payload.access_token;
        state.refreshToken = payload.refresh_token;
      });

    // builder
    //   .addCase(login.pending, (state, { payload }) => {
    //     state.status = 'loading';
    //   });
    //
    // builder
    //   .addCase(login.failed, (state, { payload }) => {
    //     state.error = payload;
    //   });
  },
});

export const selectAccessToken = (state: RootState) => state.login.accessToken;

export const loginReducer = loginSlice.reducer;
