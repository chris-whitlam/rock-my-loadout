import { FC, ReactEventHandler, useMemo, useState } from 'react';
import { Dropdown, Section } from '@atoms';
import { Weapon } from '@molecules/Weapon';
import { WeaponType, Weapon as WeaponT, BaseWeapon } from '@types';

import { useFetchWeaponsQuery } from '../../store';
import { capitalizeFirstLetter } from '@utils';

interface Props {
  currentSlot: string;
  onSelectWeapon: (weapon: BaseWeapon) => void;
}

export const WeaponSelect: FC<Props> = ({ currentSlot, onSelectWeapon }) => {
  const [weaponType, setWeaponType] = useState(
    WeaponType.ASSAULT_RIFLE as string
  );
  const { data: weapons } = useFetchWeaponsQuery();

  const filteredWeapons = useMemo(
    () => weapons?.filter((weapon) => weapon.type === weaponType),
    [weaponType, weapons]
  );

  const onSelectWeaponType: ReactEventHandler<HTMLSelectElement> = (event) => {
    setWeaponType(event.currentTarget.value);
  };

  const weaponSlotLabel = useMemo(
    () => capitalizeFirstLetter(currentSlot),
    [currentSlot, capitalizeFirstLetter]
  );

  if (!weapons) return null;

  return (
    <Section title={`Select a ${weaponSlotLabel} Weapon`}>
      <Dropdown
        options={Object.values(WeaponType)}
        onSelect={onSelectWeaponType}
      >
        Weapon Type:
      </Dropdown>
      <div className="grid grid-cols-5 gap-10">
        {filteredWeapons?.map((weapon) => (
          <Weapon
            key={weapon.uuid}
            weapon={weapon as BaseWeapon}
            onClick={onSelectWeapon}
          />
        ))}
      </div>
    </Section>
  );
};
