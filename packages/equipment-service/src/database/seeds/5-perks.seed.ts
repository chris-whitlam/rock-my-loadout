/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { getPerksData } from './data/perks';
import { Perk } from '../../modules/perks/entities';

export default class CreatePerks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const perksData = await getPerksData();

    const resolvedPerks: Perk[] = await Promise.all(
      Object.values(perksData).map(async (perk: any) => {
        const perkInstance = plainToInstance(Perk, perk, {
          ignoreDecorators: true
        });

        return perkInstance;
      })
    );

    await connection.manager.save(resolvedPerks);
  }
}
