/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Weapon } from '../../modules/weapons/entities';
import jsonRefs from 'json-refs';

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
      platforms: any;
      attachments: any;
      weapons: any;
    };

    const resolvedWeapons = Object.values(_resolved.weapons).map(
      (weapon: any) => {
        const weaponAttachments = weapon.attachments.map(
          (attachmentReference: any) =>
            _resolved.attachments[attachmentReference]
        );
        weapon.attachments = weaponAttachments;

        return weapon;
      }
    );

    console.log(resolvedWeapons);
    console.log(attachments);
    console.log(resolvedWeapons[0].attachments);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Weapon)
      .values(resolvedWeapons)
      .execute();
  }
}
