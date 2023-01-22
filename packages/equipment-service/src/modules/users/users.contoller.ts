import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators';
import { User } from './dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  @Get('profile')
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
