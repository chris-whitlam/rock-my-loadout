import { AttachmentSlot, WeaponType } from '../entities';

export const attachmentSlotsMap = {
  ['DEFAULT']: [
    AttachmentSlot.BARREL,
    AttachmentSlot.MUZZLE,
    AttachmentSlot.UNDERBARREL,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.LASER,
    AttachmentSlot.MAGAZINE,
    AttachmentSlot.OPTIC,
    AttachmentSlot.REAR_GRIP,
    AttachmentSlot.STOCK
  ],
  [WeaponType.SHOTGUN]: [
    AttachmentSlot.BARREL,
    AttachmentSlot.MUZZLE,
    AttachmentSlot.UNDERBARREL,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.LASER,
    AttachmentSlot.GUARD,
    AttachmentSlot.OPTIC,
    AttachmentSlot.STOCK
  ],
  [WeaponType.SNIPER_RIFLE]: [
    AttachmentSlot.BARREL,
    AttachmentSlot.MUZZLE,
    AttachmentSlot.UNDERBARREL,
    AttachmentSlot.AMMUNITION,
    AttachmentSlot.LASER,
    AttachmentSlot.MAGAZINE,
    AttachmentSlot.OPTIC,
    AttachmentSlot.STOCK,
    AttachmentSlot.REAR_GRIP
  ]
};

// TO UNLOCK and add attachment slots:
// MX9, HCR 56, Chimera, SO-14, PDSW 528 (Can rail == magazine?)
