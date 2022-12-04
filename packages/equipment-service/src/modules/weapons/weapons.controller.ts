import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Weapon } from './entities';
import { WeaponService } from './weapons.service';

@Controller('weapons')
@ApiTags('Weapons')
export class WeaponsController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all weapons' })
  async getWeapons(): Promise<Weapon[]> {
    console.log('sdfsdfsdf');
    const weapons = await this.weaponService.getAllWeapons();

    return weapons;
  }
}
