/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Perk, PerkPackage } from '../../modules/perks/entities';
import { getPerksData } from './data/perks';

const perkPackages = require('./data/perk-packages.json');

export default class CreatePerkPackages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const perksData: any = await getPerksData();

    const resolvedPerkPackages = await Promise.all(
      Object.values(perkPackages).map(async (perkPackage: any) => {
        const perkUUIDs: string[] = Object.values(perkPackage.perks).map(
          (reference: any) => perksData[reference].uuid
        );

        const perks = await connection.getRepository(Perk).find({
          where: {
            uuid: In(perkUUIDs)
          }
        });

        perkPackage.perks = perks;

        return perkPackage;
      })
    );

    await connection.manager.save(
      plainToInstance(PerkPackage, resolvedPerkPackages)
    );
  }
}
