/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class Clear implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('DELETE FROM perk_packages');
    await connection.query('DELETE FROM perks');
    await connection.query('DELETE FROM perk_package_perks');
    await connection.query('DELETE FROM weapon_attachments');
    await connection.query('DELETE FROM attachments');
    await connection.query('DELETE FROM weapons');
    await connection.query('DELETE FROM platforms');

    await connection.query('ALTER SEQUENCE weapons_id_seq RESTART WITH 1');
    await connection.query('ALTER SEQUENCE platforms_id_seq RESTART WITH 1');
    await connection.query('ALTER SEQUENCE attachments_id_seq RESTART WITH 1');
    await connection.query('ALTER SEQUENCE perks_id_seq RESTART WITH 1');
    await connection.query(
      'ALTER SEQUENCE perk_packages_id_seq RESTART WITH 1'
    );
  }
}
