export class LoginRepository {
  private accessTokenKey = 'login.accessToken';

  private refreshTokenKey = 'login.refreshToken';

  client = localStorage;

  setAccessToken(token: string) {
    this.client.setItem(this.accessTokenKey, token);
    return this;
  }

  getAccessToken() {
    return this.client.getItem(this.accessTokenKey);
  }

  setRefreshToken(token: string) {
    this.client.setItem(this.refreshTokenKey, token);
    return this;
  }

  getRefreshToken() {
    return this.client.getItem(this.refreshTokenKey);
  }
}

export const loginRepository = new LoginRepository();