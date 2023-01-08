import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { WeaponDto } from './dtos';

import { Attachment, AttachmentSlot, Weapon } from './entities';
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

  private transformWeapon(weapon: Weapon): WeaponDto {
    const attachments: Partial<Record<AttachmentSlot, Attachment[]>> = {};
    weapon.attachments.forEach((attachment) => {
      attachments[attachment.attachmentSlot] = [
        ...(attachments[attachment.attachmentSlot] || []),
        attachment
      ];
    });

    return plainToClass(WeaponDto, {
      uuid: weapon.uuid,
      name: weapon.name,
      type: weapon.type,
      attachments: attachments,
      attachmentSlots: Object.keys(attachments)
    });
  }

  async getAllWeapons(filterOptions: FilterOptions): Promise<WeaponDto[]> {
    const weapons = await this.weaponsRepository.getWeapons(filterOptions);
    return weapons.map(this.transformWeapon);
  }

  async getWeaponByUUID(uuid: string): Promise<WeaponDto> {
    const weapon = await this.weaponsRepository.getWeaponByUUID(uuid);
    return this.transformWeapon(weapon);
  }
}
