import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoadoutDto } from './dto/loadout.dto';
import { Loadout } from './entities';
import { LoadoutsService } from './loadouts.service';

@Controller('loadouts')
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Post()
  createLoadout(@Body() data: LoadoutDto): Promise<{ uuid: string }> {
    return this.loadoutsService.createLoadout(data);
  }

  @Get(':uuid')
  getLoadout(@Param('uuid') uuid: string): Promise<Loadout> {
    return this.loadoutsService.getLoadoutByUUID(uuid);
  }
}
