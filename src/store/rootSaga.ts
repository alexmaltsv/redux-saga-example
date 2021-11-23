import { all } from 'redux-saga/effects';
import { loginSaga } from '../features/login/redux/login.saga';

export function* rootSaga() {
  yield all([
    loginSaga(),
  ]);
}