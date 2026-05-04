import type { UserResponse } from './UserResponse';

type LoginRespose = {
  user: UserResponse;
  token: string;
};

export type { LoginRespose };
