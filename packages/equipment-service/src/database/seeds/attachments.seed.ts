import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Attachment } from '../../modules/weapons/entities';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const attachments = require('./data/attachments.json');

export default class CreateAttachments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Attachment)
      .values(Object.values(attachments))
      .execute();
  }
}
