import { DynamoDBService } from '@/services';
import { Module } from '@nestjs/common';
import { UsersController } from './users.contoller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, DynamoDBService],
  exports: [UsersService]
})
export class UsersModule {}
