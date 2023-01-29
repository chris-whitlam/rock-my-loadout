import { Expose } from 'class-transformer';
import { Attachment, AttachmentSlot, Platform, WeaponType } from '../entities';

export class BaseWeaponDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  type: WeaponType;

  @Expose()
  platform: Platform;
}

export class WeaponDto extends BaseWeaponDto {
  @Expose()
  attachments?: Record<AttachmentSlot, Attachment[]>;
}
