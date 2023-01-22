import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DynamoDBService } from '../../services';
import { WeaponService } from '../weapons';
import { Weapon } from '../weapons/entities';
import { customWeaponRepositoryMethods } from '../weapons/weapons.repository';
import { LoadoutsController } from './loadouts.controller';
import { LoadoutsService } from './loadouts.service';

@Module({
  imports: [HttpModule],
  controllers: [LoadoutsController],
  providers: [
    LoadoutsService,
    ConfigService,
    DynamoDBService,
    WeaponService,
    {
      provide: getRepositoryToken(Weapon),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource
          .getRepository(Weapon)
          .extend(customWeaponRepositoryMethods);
      }
    }
  ],
  exports: [LoadoutsService]
})
export class LoadoutsModule {}
