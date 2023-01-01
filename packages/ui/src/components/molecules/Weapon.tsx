import { FC } from 'react';
import { Weapon as WeaponT } from '@types';

interface Props {
  weapon: WeaponT;
  onClick: (weapon: WeaponT) => void;
}

export const Weapon: FC<Props> = ({ weapon, onClick }) => {
  return (
    <div className="bg-tertiary p-10" onClick={() => onClick(weapon)}>
      {weapon.name}
    </div>
  );
};
