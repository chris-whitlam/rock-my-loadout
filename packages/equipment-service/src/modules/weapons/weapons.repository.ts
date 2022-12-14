import type { Repository } from 'typeorm';
import { Weapon } from './entities';
import { FilterOptions } from './weapons.service';

export interface WeaponsRepository extends Repository<Weapon> {
  this: Repository<Weapon>;

  getWeapons(filterOptions: FilterOptions): Promise<Weapon[]>;

  getWeaponByUUID(uuid: string): Promise<Weapon[]>;
}

export const customWeaponRepositoryMethods: Pick<
  WeaponsRepository,
  'getWeapons' | 'getWeaponByUUID'
> = {
  getWeapons(this: Repository<Weapon>, { weaponUUIDs }) {
    const query = this.createQueryBuilder('weapons');

    if (weaponUUIDs.length) {
      query.andWhere('weapons.uuid IN (:...weaponUUIDs)', { weaponUUIDs });
    }

    return query.getMany();
  },
  getWeaponByUUID(this: Repository<Weapon>, uuid: string) {
    return this.findBy({ uuid });
  }
};
