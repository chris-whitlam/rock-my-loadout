import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLoadoutDto } from './dto/createLoadout.dto';
import { LoadoutsService } from './loadouts.service';

@Controller()
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Get()
  getLoadouts() {
    return this.loadoutsService.getLoadouts();
  }

  @Post()
  createLoadout(@Body() data: CreateLoadoutDto) {
    return this.loadoutsService.createLoadout(data);
  }

  @Get(':uuid')
  getLoadout(@Param('uuid') uuid: string) {
    return this.loadoutsService.getLoadoutByUUID(uuid);
  }
}
