import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetWeaponsDto, WeaponDto } from './dtos';
import { Weapon } from './entities';
import { WeaponService } from './weapons.service';

@Controller('weapons')
@ApiTags('Weapons')
export class WeaponsController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all weapons' })
  async getWeapons(@Query() queryParams?: GetWeaponsDto): Promise<Weapon[]> {
    return this.weaponService.getAllWeapons(queryParams);
  }

  @Get(':weaponUUID')
  @ApiOperation({ summary: `Retrieves a weapon based on it's uuid` })
  async getWeaponByUUID(
    @Param('weaponUUID') weaponUUID: string
  ): Promise<WeaponDto> {
    return this.weaponService.getWeaponByUUID(weaponUUID);
  }
}
