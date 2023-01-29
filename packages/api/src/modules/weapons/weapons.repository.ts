import { hasWhitespace } from '@utils';
import { Brackets, Repository } from 'typeorm';
import { GetWeaponsDto } from './dtos';
import { Weapon } from './entities';

export interface WeaponsRepository extends Repository<Weapon> {
  this: Repository<Weapon>;

  getWeapons(getWeaponsDto: GetWeaponsDto): Promise<Weapon[]>;

  getWeaponByUUID(uuid: string): Promise<Weapon>;
}

export const customWeaponRepositoryMethods: Pick<
  WeaponsRepository,
  'getWeapons' | 'getWeaponByUUID'
> = {
  async getWeapons(
    this: Repository<Weapon>,
    { type, platform }
  ): Promise<Weapon[]> {
    const query = this.createQueryBuilder('weapons').leftJoinAndSelect(
      'weapons.platform',
      'platform'
    );

    if (type) {
      query.andWhere('weapons.type = :type', { type });
    }

    if (platform) {
      if (hasWhitespace(platform)) {
        query.andWhere('platform.name = :platform', { platform });
      } else {
        query.andWhere('platform.uuid = :platform', { platform });
      }
    }

    return query.getMany();
  },
  async getWeaponByUUID(
    this: Repository<Weapon>,
    uuid: string
  ): Promise<Weapon> {
    const query = this.createQueryBuilder('weapons')
      .leftJoinAndSelect('weapons.platform', 'platform')
      .leftJoinAndSelect('weapons.attachments', 'attachments')
      .where('weapons.uuid = :uuid', { uuid });

    return query.getOne();
  }
};
