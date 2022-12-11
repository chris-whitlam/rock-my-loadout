import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EquipmentService {
  private equipmentServiceBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.equipmentServiceBaseUrl = configService.get(
      'equipmentService.baseUrl'
    );
  }

  public async getWeapon(uuid: string) {
    const result = await this.httpService.get(
      `${this.equipmentServiceBaseUrl}/weapons/${uuid}`
    );

    console.log(result);
  }
}
