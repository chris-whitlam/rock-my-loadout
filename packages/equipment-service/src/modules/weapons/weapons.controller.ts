import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Weapon } from './entities';
import { FilterOptions, WeaponService } from './weapons.service';

@Controller('weapons')
@ApiTags('Weapons')
export class WeaponsController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all weapons' })
  async getWeapons(
    @Query('weaponUUIDs') weaponUUIDs?: string
  ): Promise<Weapon[]> {
    const filterOptions: FilterOptions = {
      weaponUUIDs: weaponUUIDs ? weaponUUIDs.split(',') : []
    };

    return this.weaponService.getAllWeapons(filterOptions);
  }

  @Get(':weaponUUID')
  @ApiOperation({ summary: `Retrieves a weapon based on it's uuid` })
  async getWeaponByUUID(
    @Param('weaponUUID') weaponUUID: string
  ): Promise<Weapon> {
    return this.weaponService.getWeaponByUUID(weaponUUID);
  }
}
