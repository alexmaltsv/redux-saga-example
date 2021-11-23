import axios from 'axios';
import { loginRepository } from './loginRepository';

const axiosClient = axios.create({
  baseURL: 'https://reactlabapi.herokuapp.com/api',
});

axiosClient.interceptors.request.use(
  (request) => {
    const token = loginRepository.getAccessToken();

    if (token) {
      request.headers = {
        ...request.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    return request;
  },
  (err) => {
    if (err.statusCode === 401) {
    // refresh

      // if refresh failed - logout

    // if refresh OK - update\ tokens
    } 
  });

export type LoginDto = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  photo: string;
  role_name: string;
};

export class LoginAPI {
  constructor(private readonly client = axiosClient) {
  }

  login = (dto: LoginDto) => {
    return this.client.post<LoginResponse>('auth/login', dto);
  };


  me = () => {
    return this.client.get<Profile>('patients/me');
  };
}

export const loginAPI = new LoginAPI();