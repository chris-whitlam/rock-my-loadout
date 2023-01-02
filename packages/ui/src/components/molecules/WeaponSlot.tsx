import { FC } from 'react';
import type { Loadout, WeaponSlot as WeaponSlotT } from '@types';
import { Button } from '@atoms';

interface Props {
  label: string;
  name: WeaponSlotT;
  loadout?: Loadout;
  onClick: (name: WeaponSlotT) => void;
  onClickGunsmith: (name: WeaponSlotT) => void;
}

export const WeaponSlot: FC<Props> = ({
  label,
  name,
  loadout,
  onClick,
  onClickGunsmith
}) => {
  if (!loadout) return null;

  const loadoutWeapon = loadout[name];

  return (
    <div className="w-full">
      <span>{label}</span>
      <button
        className="bg-tertiary p-10 mt-2 text-center w-full"
        onClick={() => onClick(name)}
      >
        {loadoutWeapon?.name || 'None'}
      </button>
      {!!loadoutWeapon && (
        <Button onClick={() => onClickGunsmith(name)} className="w-full">
          Gunsmith
        </Button>
      )}
    </div>
  );
};
