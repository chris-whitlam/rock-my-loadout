import { Button, PageTitle } from '@atoms';
import { useAppDispatch, useAppSelector, useLoadout } from '@hooks';
import { Gunsmith, WeaponSelect } from '@organisms';
import { FC, useState } from 'react';
import { setPrimaryWeapon, setSecondaryWeapon, clearLoadout } from '@store';
import { WeaponSlot } from '@molecules';
import { BaseWeapon, Loadout, WeaponSlot as WeaponSlotT } from '@types';

export const CreateLoadout: FC = () => {
  const dispatch = useAppDispatch();
  const { loadout } = useAppSelector((state) => state);

  const [currentSlot, setCurrentSlot] = useState<WeaponSlotT | null>(null);
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [{ isLoading }, saveLoadout] = useLoadout();

  const onSelectWeapon = (weapon: BaseWeapon) => {
    switch (currentSlot) {
      case WeaponSlotT.PRIMARY:
        dispatch(setPrimaryWeapon(weapon));
        break;
      case WeaponSlotT.SECONDARY:
        dispatch(setSecondaryWeapon(weapon));
        break;
    }
    setCurrentMenu(null);
  };

  const onClickGunsmith = (slotName: WeaponSlotT) => {
    const menuReference = `Gunsmith-${slotName}`;
    if (currentMenu === menuReference) {
      setCurrentMenu(null);
    } else {
      setCurrentMenu(menuReference);
      setCurrentSlot(slotName);
    }
  };

  const onWeaponSlotClick = (slotName: WeaponSlotT) => {
    const menuReference = `WeaponSelect-${slotName}`;
    if (currentSlot && menuReference === currentSlot) {
      setCurrentMenu(null);
      setCurrentSlot(null);
    } else {
      setCurrentMenu(menuReference);
      setCurrentSlot(slotName);
    }
  };

  const onClear = () => {
    setCurrentSlot(null);
    setCurrentMenu(null);
    dispatch(clearLoadout());
  };

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Create a Loadout</PageTitle>
        <div>
          <Button onClick={onClear} className="w-32 bg-gray-400">
            Clear
          </Button>
          <Button
            onClick={saveLoadout}
            isLoading={isLoading}
            className="w-32 bg-primary ml-5"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="my-5 grid grid-cols-5 gap-10">
        <WeaponSlot
          label="Primary"
          name={WeaponSlotT.PRIMARY}
          loadout={loadout as Loadout}
          onClick={onWeaponSlotClick}
          onClickGunsmith={onClickGunsmith}
        />
        <WeaponSlot
          label="Secondary"
          name={WeaponSlotT.SECONDARY}
          loadout={loadout as Loadout}
          onClick={onWeaponSlotClick}
          onClickGunsmith={onClickGunsmith}
        />
      </div>
      {currentMenu?.includes('WeaponSelect') && currentSlot && (
        <WeaponSelect
          currentSlot={currentSlot}
          onSelectWeapon={onSelectWeapon}
        />
      )}
      {currentMenu?.includes('Gunsmith') && currentSlot && (
        <Gunsmith currentSlot={currentSlot} loadout={loadout as Loadout} />
      )}
    </>
  );
};
