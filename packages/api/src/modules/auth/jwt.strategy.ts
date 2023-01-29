import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { JWTToken } from './types';
import { plainToClass } from 'class-transformer';
import { User } from '../users/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate({ sub, user: { uuid } }: JWTToken) {
    const { password, ...user } = await this.usersService.getUserByUUID(
      uuid || sub
    );

    return plainToClass(User, user);
  }
}
