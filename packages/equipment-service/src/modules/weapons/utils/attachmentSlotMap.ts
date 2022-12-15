import { AttachmentSlot, WeaponType } from '../entities';

export const attachmentSlotsMap = {
  [WeaponType.ASSAULT_RIFLE]: [
    AttachmentSlot.BARREL,
    AttachmentSlot.MUZZLE,
    AttachmentSlot.UNDERBARREL
  ]
};
