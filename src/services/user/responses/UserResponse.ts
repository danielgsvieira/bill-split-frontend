import { User } from 'src/models/User';

type UserResponse = {
  id: number;
  username: string;
  displayName: string;
};

function userResponseToModel(data: UserResponse): User;
function userResponseToModel(data: UserResponse[]): User[];
function userResponseToModel(data: UserResponse | UserResponse[]): User | User[] {
  if (Array.isArray(data)) {
    return data.map((el) => userResponseToModel(el));
  }

  return new User(data);
}

export { userResponseToModel };
export type { UserResponse };
