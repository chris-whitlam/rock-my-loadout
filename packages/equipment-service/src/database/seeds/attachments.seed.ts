/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Attachment } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';

const attachments = require('./data/attachments.json');

export default class CreateAttachments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.manager.save(
      plainToInstance(Attachment, Object.values(attachments))
    );
  }
}
