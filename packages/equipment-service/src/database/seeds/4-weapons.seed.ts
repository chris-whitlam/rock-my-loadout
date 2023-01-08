/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, In } from 'typeorm';
import { Attachment, Platform, Weapon } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';
import { getWeaponData } from './data/weapons';
import { getAttachmentsData } from './data/attachments';

const platformsData = require('./data/platforms.json');

export default class CreateWeapons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const weaponsData = await getWeaponData();
    const attachmentsData: any = await getAttachmentsData();

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

        if (weapon.attachments) {
          const attachmentUUIDs: string[] = [];
          Object.values(weapon.attachments).map((attachmentSlot: any) =>
            attachmentSlot.map((reference: string) => {
              attachmentUUIDs.push(attachmentsData[reference].uuid);
            })
          );

          console.log(attachmentUUIDs);

          const attachments = await connection.getRepository(Attachment).find({
            where: {
              uuid: In(attachmentUUIDs)
            }
          });

          weapon.attachments = attachments;
        }

        return plainToInstance(Weapon, weapon, {
          ignoreDecorators: true
        });
      })
    );

    await connection.manager.save(resolvedWeapons);
  }
}
