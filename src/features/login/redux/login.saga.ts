import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadActionCreator } from '@reduxjs/toolkit/src/createAction';
import { login } from './login.actions';
import { loginAPI, LoginResponse, Profile } from '../loginAPI';
import { AxiosResponse } from 'axios';
import { loginRepository } from '../loginRepository';

type AsyncActionType = {
  pending: PayloadActionCreator<any>;
  fulfilled: PayloadActionCreator<any>;
  failed: PayloadActionCreator<any>;
};

type AnyFunction = (...rest: any[]) => any;
function* runAsyncSaga(action: AsyncActionType, saga: AnyFunction, pendingAction?: PayloadActionCreator<any>) {
  try {
    const result = yield saga(pendingAction);
    yield put(action.fulfilled(result));
  } catch (error) {
    const errorSerialized = {
      message: error.message,
      stack: error.stack,
    };

    yield put(action.failed(errorSerialized));
    throw error;
  }
}


function* loginPost(action: ReturnType<typeof login.pending>) {
  const payload = action.payload;
  const response: AxiosResponse<LoginResponse> = yield call(
    loginAPI.login,
    { userName: payload.username, password: payload.password },
  );

  const { data } = response;

  if (data.access_token) {
    loginRepository
      .setAccessToken(data.access_token)
      .setRefreshToken(data.refresh_token);
  }

  const profile: AxiosResponse<Profile> = yield call(loginAPI.me);

  console.log('profile', profile.data);

  return response.data;
}

const loginPostSaga = runAsyncSaga.bind(null, login, loginPost);

function* loginPostWatcher() {
  yield takeEvery(login.pending, loginPostSaga);
}

export function* loginSaga() {
  yield loginPostWatcher();
}