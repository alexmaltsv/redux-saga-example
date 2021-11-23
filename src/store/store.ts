import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { loginReducer  } from '../features/login/redux/login.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },

  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
