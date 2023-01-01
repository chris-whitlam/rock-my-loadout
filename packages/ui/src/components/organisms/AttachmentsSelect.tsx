import { FC } from 'react';
import { Section } from '@atoms';
import { Weapon as WeaponT } from '@types';

import { useFetchWeaponQuery } from '@store/slices/equipment-api';
import { AttachmentSlot } from '@molecules';

interface Props {
  weaponUUID: string;
  onSelectWeapon: (weapon: WeaponT) => void;
}

export const AttachmentsSelect: FC<Props> = ({
  weaponUUID,
  onSelectAttachment
}) => {
  const { data: weapon } = useFetchWeaponQuery(weaponUUID);

  if (!weapon) return null;

  return (
    <Section title={weapon.name}>
      <span>Image Here</span>
      {weapon.attachmentSlots.map((name) => (
        <AttachmentSlot name={name} onClick={onSelectAttachment} />
      ))}
    </Section>
  );
};
