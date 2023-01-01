import { FC } from 'react';
import { Weapon as WeaponT } from '@types';

interface Props {
  name: string;
  weapon?: WeaponT;
  onClick: (name: string) => void;
}

export const AttachmentSlot: FC<Props> = ({ name, weapon, onClick }) => {
  return (
    <div>
      <span>{name}</span>
      <div className="bg-tertiary p-10" onClick={() => onClick(name)}>
        {weapon?.name || 'None'}
      </div>
    </div>
  );
};
