/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import jsonRefs from 'json-refs';
import { plainToInstance } from 'class-transformer';
import { Perk, PerkPackage } from '../../modules/perks/entities';

const perkPackages = require('./data/perk-packages.json');
const perks = require('./data/perks.json');

export default class CreatePerkPackages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const { resolved } = await jsonRefs.resolveRefs({
      perkPackages,
      perks
    });

    const _resolved = resolved as {
      perkPackages: PerkPackage[];
      perks: Perk[];
    };

    const resolvedPerkPackages: PerkPackage[] = Object.values(
      _resolved.perkPackages
    ).map((perkPackage: PerkPackage) => {
      const perkPackagePerks: Perk[] = perkPackage.perks.map(
        (perkReference: any) => _resolved.perks[perkReference]
      );
      perkPackage.perks = plainToInstance(Perk, perkPackagePerks);

      return perkPackage;
    });

    await connection.manager.save(
      plainToInstance(PerkPackage, resolvedPerkPackages)
    );
  }
}
