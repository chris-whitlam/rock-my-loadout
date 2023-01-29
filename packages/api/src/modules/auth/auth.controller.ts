import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }
}
