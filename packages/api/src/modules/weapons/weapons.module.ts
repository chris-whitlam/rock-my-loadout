import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { WeaponsController, WeaponService } from '.';
import { Weapon } from './entities';
import { customWeaponRepositoryMethods } from './weapons.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponsController],
  providers: [
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
  ]
})
export class WeaponsModule {}
