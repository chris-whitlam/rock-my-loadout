import { FC, useMemo, useState } from 'react';
import { Section } from '@atoms';
import { Attachment, Loadout, LoadoutWeapon, WeaponSlot } from '@types';

import { useFetchWeaponQuery } from '@store/slices/api';
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
  const numOfSelectedAttachments =
    (loadoutWeapon.attachments &&
      Object.keys(loadoutWeapon.attachments).length) ||
    0;
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
    if (
      numOfSelectedAttachments >= 5 &&
      loadoutWeapon.attachments &&
      !Object.keys(loadoutWeapon.attachments).includes(slotName)
    ) {
      return;
    }
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

  const onRemoveAttachment = (attachmentSlot: string) => {
    const loadoutWeaponWithAttachment = {
      ...loadoutWeapon,
      attachments:
        loadoutWeapon.attachments &&
        Object.entries(loadoutWeapon.attachments)
          .filter(([key]) => key != attachmentSlot)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
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

  const onRemoveAllAttachments = () => {
    const loadoutWeaponWithAttachment = {
      ...loadoutWeapon,
      attachments: undefined
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
      <Section title={weapon.name} subHeading={weaponSlotLabel.toUpperCase()}>
        <div className="flex content-center justify-center">
          <img src="/images/weapons/m4.png" />
        </div>
        <div>
          <div className="flex gap-2 align-items-center justify-center">
            {[...Array(5)].map((x, i) => {
              if (i < numOfSelectedAttachments) {
                return <div className="bg-primary rounded-full w-5 h-5" />;
              }
              return <div className="border-2 rounded-full w-5 h-5" />;
            })}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onRemoveAllAttachments}
              className="hover:underline font-thin"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="flex flex-start gap-10 flex-grow-1 mt-5">
          {Object.keys(weapon.attachments).map((slotName) => {
            const isDisabled =
              numOfSelectedAttachments >= 5 &&
              loadoutWeapon.attachments &&
              !Object.keys(loadoutWeapon.attachments).includes(slotName);

            return (
              <AttachmentSlot
                key={slotName}
                name={slotName}
                isDisabled={isDisabled}
                attachment={
                  loadoutWeapon.attachments &&
                  loadoutWeapon.attachments[slotName]
                }
                onClick={onClickAttachmentSlot}
              />
            );
          })}
        </div>
      </Section>
      <AttachmentSelect
        isOpen={!!showAttachmentSelect}
        onClose={() => setShowAttachmentSelect(false)}
        onClickAttachment={onClickAttachment}
        onRemoveAttachment={onRemoveAttachment}
        attachments={weapon.attachments[selectedAttachmentSlot || '']}
      />
    </>
  );
};
