import { PageTitle } from '@atoms';
import { useAppDispatch, useAppSelector } from '@hooks';
import { AttachmentsSelect, WeaponSelect } from '@organisms';
import { FC, useState } from 'react';
import { setPrimaryWeapon, setSecondaryWeapon } from '@store';
import { WeaponSlot } from '@molecules';
import { Weapon } from '@types';

export const CreateLoadout: FC = () => {
  const [currentWeapon, setCurrentWeapon] = useState<Weapon>();
  const [currentSlot, setCurrentSlot] = useState<string>();
  const dispatch = useAppDispatch();
  const { loadout } = useAppSelector((state) => state);
  console.log(loadout);

  const onSelectWeapon = (weapon: Weapon) => {
    switch (currentSlot) {
      case 'Primary':
        dispatch(setPrimaryWeapon(weapon));
        break;
      case 'Secondary':
        dispatch(setSecondaryWeapon(weapon));
        break;
    }
    setCurrentWeapon(weapon);
  };

  return (
    <>
      <PageTitle>Create a Loadout</PageTitle>
      <div className="my-5 grid grid-cols-5 gap-10">
        <WeaponSlot
          name="Primary"
          weapon={loadout.primaryWeapon}
          onClick={(slotName) => {
            setCurrentSlot(slotName);
          }}
        />
        <WeaponSlot
          name="Secondary"
          weapon={loadout.secondaryWeapon}
          onClick={(slotName) => {
            setCurrentSlot(slotName);
          }}
        />
      </div>
      {currentSlot && !currentWeapon && (
        <WeaponSelect
          currentSlot={currentSlot}
          onSelectWeapon={onSelectWeapon}
        />
      )}
      {currentWeapon && (
        <AttachmentsSelect
          weaponUUID={currentWeapon?.uuid}
          onSelectWeapon={onSelectWeapon}
        />
      )}
    </>
  );
};
