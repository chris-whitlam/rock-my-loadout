import { FC, useMemo, useState } from 'react';
import { Section } from '@atoms';
import { Attachment, Loadout, LoadoutWeapon, WeaponSlot } from '@types';

import { useFetchWeaponQuery } from '@store/slices/equipment-api';
import { AttachmentSlot } from '@molecules';
import { AttachmentSelect } from './AttachmentSelect';
import { useAppDispatch } from '@hooks';
import { setPrimaryWeapon, setSecondaryWeapon } from '@store';
import { capitalizeFirstLetter } from '@utils';

interface Props {
  loadout: Loadout;
  currentSlot: WeaponSlot;
}

export const Gunsmith: FC<Props> = ({ loadout, currentSlot }) => {
  const dispatch = useAppDispatch();
  const loadoutWeapon = loadout[currentSlot];
  const { data: weapon } = useFetchWeaponQuery(loadoutWeapon.uuid);
  const [selectedAttachmentSlot, setSelectedAttachmentSlot] = useState<
    string | null
  >(null);
  const [showAttachmentSelect, setShowAttachmentSelect] =
    useState<boolean>(false);

  const weaponSlotLabel = useMemo(
    () => capitalizeFirstLetter(currentSlot),
    [currentSlot, capitalizeFirstLetter]
  );

  if (!weapon) return null;

  const onClickAttachmentSlot = (slotName: string) => {
    setSelectedAttachmentSlot(slotName);
    setShowAttachmentSelect(true);
  };

  const onClickAttachment = (attachment: Attachment) => {
    const loadoutWeaponWithAttachment = {
      ...loadoutWeapon,
      attachments: {
        ...loadoutWeapon.attachments,
        ...{ [attachment.attachmentSlot]: attachment }
      }
    };

    switch (currentSlot) {
      case WeaponSlot.PRIMARY:
        dispatch(setPrimaryWeapon(loadoutWeaponWithAttachment));
        break;

      case WeaponSlot.SECONDARY:
        dispatch(setSecondaryWeapon(loadoutWeaponWithAttachment));
        break;
    }

    setSelectedAttachmentSlot(null);
    setShowAttachmentSelect(false);
  };

  return (
    <>
      <Section title={weapon.name} subHeading={weaponSlotLabel}>
        <span>Image Here</span>
        <div className="flex flex-start gap-10 flex-grow-1 mt-5">
          {Object.keys(weapon.attachments).map((slotName) => (
            <AttachmentSlot
              key={slotName}
              name={slotName}
              attachment={
                loadoutWeapon.attachments && loadoutWeapon.attachments[slotName]
              }
              onClick={onClickAttachmentSlot}
            />
          ))}
        </div>
      </Section>
      <AttachmentSelect
        isOpen={!!showAttachmentSelect}
        onClose={() => setShowAttachmentSelect(false)}
        onClickAttachment={onClickAttachment}
        attachments={weapon.attachments[selectedAttachmentSlot || '']}
      />
    </>
  );
};
