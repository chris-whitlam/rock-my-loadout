import { User } from '@/modules/users/dto';

export interface JWTToken {
  sub: string;
  user: User;
  iat: number;
  exp: number;
}
