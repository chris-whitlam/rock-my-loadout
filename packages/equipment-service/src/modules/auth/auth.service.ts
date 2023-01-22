import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string) {
    const user = (await this.usersService.getUserByUsername(username)) as any;
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;

    return user;
  }

  public async signup(data: SignupDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return this.usersService.createUser(data.username, hashedPassword);
  }

  async generateJWT(user: User) {
    const payload = { sub: user.uuid, user };
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
