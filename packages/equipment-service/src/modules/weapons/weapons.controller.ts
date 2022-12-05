import { Controller, Get, Param } from '@nestjs/common';
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
    const weapons = await this.weaponService.getAllWeapons();

    return weapons;
  }

  @Get(':weaponUUID')
  @ApiOperation({ summary: `Retrieves a weapon based on it's uuid` })
  async getWeaponByUUID(
    @Param('weaponUUID') weaponUUID: string
  ): Promise<Weapon> {
    return this.weaponService.getWeaponByUUID(weaponUUID);
  }
}
