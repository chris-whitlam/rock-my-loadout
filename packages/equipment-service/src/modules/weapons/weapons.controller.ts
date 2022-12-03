import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Weapon } from './entities';
import { WeaponService } from './weapons.service';

@Controller('weapons')
@ApiTags('Weapons')
export class WeaponsController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all weapons' })
  getWeapons(): Promise<Weapon[]> {
    return this.weaponService.getAllWeapons();
  }
}
