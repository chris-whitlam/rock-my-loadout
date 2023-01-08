import { Attachment, AttachmentSlot, Platform, WeaponType } from '../entities';

export class WeaponDto {
  uuid: string;

  name: string;

  type: WeaponType;

  platform: Platform;

  attachments?: Record<AttachmentSlot, Attachment[]>;

  attachmentSlots: AttachmentSlot[];
}
