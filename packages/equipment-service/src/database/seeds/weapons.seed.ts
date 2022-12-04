/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Attachment, Platform, Weapon } from '../../modules/weapons/entities';
import jsonRefs from 'json-refs';
import { plainToInstance } from 'class-transformer';

const weapons = require('./data/weapons.json');
const platforms = require('./data/platforms.json');
const attachments = require('./data/attachments.json');

export default class CreateWeapons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const { resolved } = await jsonRefs.resolveRefs({
      platforms,
      attachments,
      weapons
    });

    const _resolved = resolved as {
      platforms: Platform[];
      attachments: Attachment[];
      weapons: Weapon[];
    };

    const resolvedWeapons: Weapon[] = Object.values(_resolved.weapons).map(
      (weapon: Weapon) => {
        const weaponAttachments: Attachment[] = weapon.attachments.map(
          (attachmentReference: any) =>
            _resolved.attachments[attachmentReference]
        );
        weapon.attachments = plainToInstance(Attachment, weaponAttachments);

        return weapon;
      }
    );

    await connection.manager.save(plainToInstance(Weapon, resolvedWeapons));
  }
}
