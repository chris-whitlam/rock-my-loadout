import { FC } from 'react';
import { BaseWeapon, Weapon as WeaponT } from '@types';

interface Props {
  weapon: BaseWeapon;
  onClick: (weapon: BaseWeapon) => void;
}

export const Weapon: FC<Props> = ({ weapon, onClick }) => {
  return (
    <div
      className="bg-tertiary p-10 text-center"
      onClick={() => onClick(weapon)}
    >
      {weapon.name}
    </div>
  );
};
