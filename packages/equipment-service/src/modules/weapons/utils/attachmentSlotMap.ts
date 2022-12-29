import { AttachmentSlot, WeaponType } from '../entities';

export const attachmentSlotsMap = {
  DEFAULT: [
    AttachmentSlot.MUZZLE,
    AttachmentSlot.BARREL,
    AttachmentSlot.LASER,
    AttachmentSlot.OPTIC,
    AttachmentSlot.STOCK,
    AttachmentSlot.REAR_GRIP,
    AttachmentSlot.MAGAZINE,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.UNDERBARREL
  ],
  [WeaponType.SHOTGUN]: [
    AttachmentSlot.MUZZLE,
    AttachmentSlot.BARREL,
    AttachmentSlot.LASER,
    AttachmentSlot.OPTIC,
    AttachmentSlot.STOCK,
    AttachmentSlot.GUARD,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.UNDERBARREL
  ],
  [WeaponType.HANDGUN]: [
    AttachmentSlot.MUZZLE,
    AttachmentSlot.BARREL,
    AttachmentSlot.LASER,
    AttachmentSlot.OPTIC,
    AttachmentSlot.REAR_GRIP,
    AttachmentSlot.MAGAZINE,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.TRIGGER_ACTION
  ]
};
