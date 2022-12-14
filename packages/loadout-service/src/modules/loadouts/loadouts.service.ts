import { Injectable } from '@nestjs/common';
import { DynamoDBService, EquipmentService } from '../services';
import { CreateLoadoutDto } from './dto/createLoadout.dto';
import { Loadout } from './types/loadout';

@Injectable()
export class LoadoutsService {
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    private readonly equipmentService: EquipmentService
  ) {}

  public getLoadouts(): Loadout[] {
    return [];
  }

  public async getLoadoutByUUID(uuid: string) {
    const storedLoadout = await this.dynamoDBService.getLoadoutByUUID(uuid);
  }

  public createLoadout(data: CreateLoadoutDto) {
    return this.dynamoDBService.saveLoadout(data);
  }
}
