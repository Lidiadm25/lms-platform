import { User } from './user.interface';

export interface AuthResponse {
  user: User;
  token: string;
  roles: string[];
}

export interface jwtToken {
  id: string;
  iat: number;
  exp: number;
}
