import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeaponsController, WeaponService } from '.';
import { Weapon } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponsController],
  providers: [WeaponService],
})
export class WeaponsModule {}
