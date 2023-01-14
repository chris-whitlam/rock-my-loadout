"use strict";
var _a;
exports.__esModule = true;
exports.attachmentSlotsMap = void 0;
var entities_1 = require("../entities");
exports.attachmentSlotsMap = (_a = {
        DEFAULT: [
            entities_1.AttachmentSlot.MUZZLE,
            entities_1.AttachmentSlot.BARREL,
            entities_1.AttachmentSlot.LASER,
            entities_1.AttachmentSlot.OPTIC,
            entities_1.AttachmentSlot.STOCK,
            entities_1.AttachmentSlot.REAR_GRIP,
            entities_1.AttachmentSlot.MAGAZINE,
            entities_1.AttachmentSlot.AMMUNITION,
            entities_1.AttachmentSlot.UNDERBARREL
        ]
    },
    _a[entities_1.WeaponType.SHOTGUN] = [
        entities_1.AttachmentSlot.MUZZLE,
        entities_1.AttachmentSlot.BARREL,
        entities_1.AttachmentSlot.LASER,
        entities_1.AttachmentSlot.OPTIC,
        entities_1.AttachmentSlot.STOCK,
        entities_1.AttachmentSlot.GUARD,
        entities_1.AttachmentSlot.AMMUNITION,
        entities_1.AttachmentSlot.UNDERBARREL
    ],
    _a[entities_1.WeaponType.HANDGUN] = [
        entities_1.AttachmentSlot.MUZZLE,
        entities_1.AttachmentSlot.BARREL,
        entities_1.AttachmentSlot.LASER,
        entities_1.AttachmentSlot.OPTIC,
        entities_1.AttachmentSlot.REAR_GRIP,
        entities_1.AttachmentSlot.MAGAZINE,
        entities_1.AttachmentSlot.AMMUNITION,
        entities_1.AttachmentSlot.TRIGGER_ACTION
    ],
    _a);
