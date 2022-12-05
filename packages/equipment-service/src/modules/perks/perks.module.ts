import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PerksController } from './perks.controller';
import { PerksService } from './perks.service';
import { Perk, PerkPackage } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perk]),
    TypeOrmModule.forFeature([PerkPackage])
  ],
  controllers: [PerksController],
  providers: [PerksService]
})
export class PerksModule {}
