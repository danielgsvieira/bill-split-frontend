import { httpClient } from 'src/utils';
import type { isUsernameAvailableResponse, LoginRespose, UserResponse } from './responses';

class AuthService {
  declare readonly __brand: symbol & { __brand: 'AuthService' };

  readonly basePath = 'auth';

  public async login(data: { username: string; password: string }) {
    return httpClient.post<LoginRespose>(`${this.basePath}/login`, { ...data });
  }

  public async register(data: { username: string; password: string; displayName: string }) {
    return httpClient.post<LoginRespose>(`${this.basePath}/register`, { ...data });
  }

  public async userInfo() {
    return httpClient.get<UserResponse>(`${this.basePath}/user-info`);
  }

  public async isUsernameAvailable(username: string) {
    return httpClient.post<isUsernameAvailableResponse>(`${this.basePath}/is-username-available`, {
      username,
    });
  }
}

const authService = new AuthService();

export { authService };
