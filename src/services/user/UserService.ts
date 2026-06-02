import { httpClient } from 'src/utils';
import { type UserResponse, userResponseToModel } from './responses';

class UserService {
  declare readonly __brand: symbol & { __brand: 'UserService' };

  readonly basePath = 'user';

  async listUsersAvailableToShareWith() {
    const response = await httpClient.get<UserResponse[]>(`${this.basePath}/to-share-with`);

    return userResponseToModel(response);
  }
}

const userService = new UserService();

export { userService };
