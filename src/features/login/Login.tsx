import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectAccessToken,
} from './redux/login.slice';
import styles from './Login.module.css';
import { login } from './redux/login.actions';

export function Login() {
  const token = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.value}>{token}</div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Login"
          onClick={() => dispatch(login.pending({
            'username': 'dima@mail.ru',
            'password': 'dima@mail.ru',
          }))}
        >
          Login
        </button>
      </div>
    </div>
  );
}
