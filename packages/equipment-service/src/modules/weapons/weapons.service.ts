import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Weapon } from './entities';
import { WeaponsRepository } from './weapons.repository';

export interface FilterOptions {
  weaponUUIDs: string[];
}

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponsRepository: WeaponsRepository
  ) {}

  getAllWeapons(filterOptions: FilterOptions): Promise<Weapon[]> {
    return this.weaponsRepository.getWeapons(filterOptions);
  }

  getWeaponByUUID(uuid: string): Promise<Weapon> {
    return this.weaponsRepository.findOne({
      relations: {
        platform: true,
        attachments: true
      },
      where: { uuid }
    });
  }
}
