/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Attachment, Platform, Weapon } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';

const weaponsData = require('./data/weapons.json');
const attachmentsData = require('./data/attachments.json');
const platformsData = require('./data/platforms.json');

export default class CreateWeapons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const resolvedWeapons: Weapon[] = await Promise.all(
      Object.values(weaponsData).map(async (weapon: any) => {
        const weaponAttachmentsUUIDs: Attachment[] = weapon.attachments.map(
          (attachmentReference: any) => ({
            uuid: attachmentsData[attachmentReference].uuid
          })
        );

        const attachments = await connection
          .getRepository(Attachment)
          .findBy(weaponAttachmentsUUIDs);
        weapon.attachments = plainToInstance(Attachment, attachments);

        const weaponPlatformUUID = platformsData[weapon.platform].uuid;
        const platform = await connection
          .getRepository(Platform)
          .findOne({ where: { uuid: weaponPlatformUUID } });

        weapon.platform = plainToInstance(Platform, platform);

        return weapon;
      })
    );

    await Promise.all(
      resolvedWeapons.map(async (weapon) => {
        await connection.manager.save(plainToInstance(Weapon, weapon));
      })
    );
  }
}
