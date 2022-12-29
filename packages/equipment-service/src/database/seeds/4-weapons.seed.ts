/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Platform, Weapon } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';
import { getWeaponData } from './data/weapons';

const platformsData = require('./data/platforms.json');

export default class CreateWeapons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const weaponsData = await getWeaponData();

    const resolvedWeapons: Weapon[] = await Promise.all(
      Object.values(weaponsData).map(async (weapon: any) => {
        const weaponPlatformUUID = platformsData[weapon.platform]?.uuid;
        if (weaponPlatformUUID) {
          const platform = await connection
            .getRepository(Platform)
            .findOne({ where: { uuid: weaponPlatformUUID } });

          weapon.platform = plainToInstance(Platform, platform, {
            ignoreDecorators: true
          });
        }

        return plainToInstance(Weapon, weapon, {
          ignoreDecorators: true
        });
      })
    );

    await connection.manager.save(resolvedWeapons);
  }
}
