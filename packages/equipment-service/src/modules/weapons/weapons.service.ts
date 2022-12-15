import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

import { AttachmentSlot, Weapon, WeaponType } from './entities';
import { attachmentSlotsMap } from './utils';
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

  private transformWeapon(weapon: Weapon) {
    const weaponAttachments = weapon.platform.attachments.filter((attachment) =>
      attachmentSlotsMap[weapon.type].includes(attachment.attachmentSlot)
    );

    weapon.attachments = weaponAttachments;
    delete weapon.platform.attachments;
    return weapon;
  }

  async getAllWeapons(filterOptions: FilterOptions): Promise<Weapon[]> {
    const weapons = await this.weaponsRepository.getWeapons(filterOptions);
    return weapons.map(this.transformWeapon);
  }

  async getWeaponByUUID(uuid: string): Promise<Weapon> {
    const weapon = await this.weaponsRepository.getWeaponByUUID(uuid);

    return this.transformWeapon(weapon);
  }
}
