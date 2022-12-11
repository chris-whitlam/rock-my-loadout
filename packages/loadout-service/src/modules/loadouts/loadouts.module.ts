import { Module } from '@nestjs/common';
import { DynamoDBService } from '../services';
import { LoadoutsController } from './loadouts.controller';
import { LoadoutsService } from './loadouts.service';

@Module({
  imports: [],
  controllers: [LoadoutsController],
  providers: [LoadoutsService, DynamoDBService]
})
export class LoadoutsModule {}
