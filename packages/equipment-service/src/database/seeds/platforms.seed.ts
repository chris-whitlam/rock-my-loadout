import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Platform } from '../../modules/weapons/entities';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const platforms = require('./data/platforms.json');

export default class CreatePlatforms implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Platform)
      .values(Object.values(platforms))
      .execute();
  }
}
