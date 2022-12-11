/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Platform } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';

const platforms = require('./data/platforms.json');

export default class CreateWeapons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.manager.save(
      plainToInstance(Platform, Object.values(platforms))
    );
  }
}
