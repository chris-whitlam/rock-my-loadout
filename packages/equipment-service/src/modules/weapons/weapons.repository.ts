import type { Repository } from 'typeorm';
import { Attachment, Weapon } from './entities';
import { FilterOptions } from './weapons.service';

export interface WeaponsRepository extends Repository<Weapon> {
  this: Repository<Weapon>;

  getWeapons(filterOptions: FilterOptions): Promise<Weapon[]>;

  getWeaponByUUID(uuid: string): Promise<Weapon>;
}

export const customWeaponRepositoryMethods: Pick<
  WeaponsRepository,
  'getWeapons' | 'getWeaponByUUID'
> = {
  async getWeapons(
    this: Repository<Weapon>,
    { weaponUUIDs }
  ): Promise<Weapon[]> {
    const query = this.createQueryBuilder('weapons')
      .leftJoinAndSelect('weapons.platform', 'platform')
      .leftJoinAndSelect(
        'platform.attachments',
        'attachments',
        'attachments.platformId = platform.id OR attachments.platformId IS NULL'
      );

    if (weaponUUIDs.length) {
      query.andWhere('weapons.uuid IN (:...weaponUUIDs)', { weaponUUIDs });
    }

    return query.getMany();
  },
  async getWeaponByUUID(
    this: Repository<Weapon>,
    uuid: string
  ): Promise<Weapon> {
    const query = this.createQueryBuilder('weapons')
      .leftJoinAndSelect('weapons.platform', 'platform')
      .leftJoinAndSelect(
        'platform.attachments',
        'attachments',
        'attachments.platformId = platform.id OR attachments.platformId IS NULL'
      )
      .where('weapons.uuid = :uuid', { uuid });

    return query.getOne();
  }
};
