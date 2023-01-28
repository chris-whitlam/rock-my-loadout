import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser, Public } from '../auth/decorators';
import { User } from '../users/dto';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { Loadout } from './entities';
import { LoadoutsService } from './loadouts.service';

@Controller('loadouts')
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Post()
  async createLoadout(
    @CurrentUser() user: User,
    @Body() data: CreateLoadoutDto
  ): Promise<{ uuid: string }> {
    return this.loadoutsService.createLoadout(data, user);
  }

  @Public()
  @Get(':uuid')
  getLoadout(@Param('uuid') uuid: string): Promise<Loadout> {
    return this.loadoutsService.getLoadoutByUUID(uuid);
  }
}
