import { Expose } from 'class-transformer';
import { Attachment, AttachmentSlot, Platform, WeaponType } from '../entities';

export class WeaponDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  type: WeaponType;

  @Expose()
  platform: Platform;

  @Expose()
  attachments?: Record<AttachmentSlot, Attachment[]>;
}
