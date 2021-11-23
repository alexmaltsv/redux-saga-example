import { createAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../loginAPI';

const createSagaActions = <T1 = any, T2 = any, T3 = any>(prefix: string) => ({
  pending: createAction<T1>(prefix + '/pending'),
  fulfilled: createAction<T2>(prefix + '/fulfilled'),
  failed: createAction<T3>(prefix + '/failed'),
});

type LoginPending = { username: string; password: string };
type LoginFulfilled = LoginResponse;
export const login = createSagaActions<LoginPending, LoginFulfilled>('login');

export const loginRequest = createAction('login/pending');
export const loginFulfilled = createAction('login/fulfilled');
export const loginFailed = createAction('login/failed');
