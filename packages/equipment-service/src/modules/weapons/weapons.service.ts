import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Weapon } from './entities';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponsRepository: Repository<Weapon>
  ) {}

  getAllWeapons(): Promise<Weapon[]> {
    console.log('sadfsdoisdf');
    return this.weaponsRepository
      .createQueryBuilder('weapon')
      .leftJoinAndSelect('weapon.platform', 'platform')
      .leftJoinAndSelect('weapon.attachments', 'attachments')
      .getMany();
  }
}
