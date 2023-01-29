import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { GetWeaponsDto, WeaponDto } from './dtos';

import { Attachment, AttachmentSlot, Weapon } from './entities';
import { WeaponsRepository } from './weapons.repository';

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

    return plainToClass(
      WeaponDto,
      {
        ...weapon,
        attachments: attachments
      },
      { excludeExtraneousValues: true }
    );
  }

  async getAllWeapons(getWeaponsDto: GetWeaponsDto): Promise<Weapon[]> {
    return this.weaponsRepository.getWeapons(getWeaponsDto);
  }

  async getWeaponByUUID(uuid: string): Promise<WeaponDto> {
    const weapon = await this.weaponsRepository.getWeaponByUUID(uuid);
    return this.transformWeapon(weapon);
  }
}
