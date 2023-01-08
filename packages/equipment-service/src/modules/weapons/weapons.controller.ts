import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeaponDto } from './dtos';
import { FilterOptions, WeaponService } from './weapons.service';

@Controller('weapons')
@ApiTags('Weapons')
export class WeaponsController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all weapons' })
  async getWeapons(
    @Query('weaponUUIDs') weaponUUIDs?: string
  ): Promise<WeaponDto[]> {
    const filterOptions: FilterOptions = {
      weaponUUIDs: weaponUUIDs ? weaponUUIDs.split(',') : []
    };

    return this.weaponService.getAllWeapons(filterOptions);
  }

  @Get(':weaponUUID')
  @ApiOperation({ summary: `Retrieves a weapon based on it's uuid` })
  async getWeaponByUUID(
    @Param('weaponUUID') weaponUUID: string
  ): Promise<WeaponDto> {
    return this.weaponService.getWeaponByUUID(weaponUUID);
  }
}
