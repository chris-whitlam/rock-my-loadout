import { FC } from 'react';
import { BaseWeapon, Weapon as WeaponT } from '@types';

interface Props {
  weapon: BaseWeapon;
  onClick: (weapon: BaseWeapon) => void;
}

export const Weapon: FC<Props> = ({ weapon, onClick }) => {
  return (
    <div
      className="bg-tertiary p-6 text-center text-3xl font-bold"
      onClick={() => onClick(weapon)}
    >
      {weapon.name}
    </div>
  );
};
