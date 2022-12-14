import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBService, EquipmentService } from '../services';
import { LoadoutsController } from './loadouts.controller';
import { LoadoutsService } from './loadouts.service';

@Module({
  imports: [HttpModule],
  controllers: [LoadoutsController],
  providers: [LoadoutsService, EquipmentService, ConfigService, DynamoDBService]
})
export class LoadoutsModule {}
