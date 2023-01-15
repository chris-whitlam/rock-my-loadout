import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPerksDto } from './dtos';
import { Perk, PerkPackage } from './entities';
import { PerksService } from './perks.service';

@Controller('perks')
@ApiTags('Perks')
export class PerksController {
  constructor(private readonly perksService: PerksService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all perks' })
  async getPerks(@Query() getPerksDto: GetPerksDto): Promise<Perk[]> {
    return this.perksService.getAllPerks(getPerksDto);
  }

  @Get('packages')
  @ApiOperation({ summary: `Retrieves all perk packages` })
  async getAllPerkPackages(): Promise<PerkPackage[]> {
    return this.perksService.getAllPerkPackages();
  }

  @Get('packages/:perkPackageUUID')
  @ApiOperation({ summary: `Retrieves a perk package based on it's uuid` })
  async getPerkPackageByUUID(
    @Param('perkPackageUUID') perkPackageUUID: string
  ): Promise<PerkPackage> {
    return this.perksService.getPerkPackageByUUID(perkPackageUUID);
  }

  @Get(':perkUUID')
  @ApiOperation({ summary: `Retrieves a perk based on it's uuid` })
  async getPerkByUUID(@Param('perkUUID') perkUUID: string): Promise<Perk> {
    return this.perksService.getPerkByUUID(perkUUID);
  }
}
