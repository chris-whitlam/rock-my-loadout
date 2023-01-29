import { BaseWeaponDto } from '@/modules/weapons/dtos';
import { Attachment, AttachmentSlot } from '@weapons/entities';
import { Exclude, Expose } from 'class-transformer';
import { PerkPackage } from '../../perks/entities';

export class LoadoutWeaponDto extends BaseWeaponDto {
  @Expose()
  attachments?: Record<AttachmentSlot, Attachment>;
}

@Exclude()
export class Loadout {
  @Expose()
  uuid!: string;

  @Expose()
  primaryWeapon!: LoadoutWeaponDto;

  @Expose()
  secondaryWeapon!: LoadoutWeaponDto;

  @Expose()
  perkPackage?: PerkPackage;
}
