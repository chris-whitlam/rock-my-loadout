import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserDTO } from '../../users/dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDTO => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);
