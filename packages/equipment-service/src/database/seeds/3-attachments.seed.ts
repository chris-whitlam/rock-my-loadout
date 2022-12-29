/* eslint-disable @typescript-eslint/no-var-requires */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Attachment, Platform } from '../../modules/weapons/entities';
import { plainToInstance } from 'class-transformer';
import { getAttachmentsData } from './data/attachments';

const platformsData = require('./data/platforms.json');

export default class CreateAttachments implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const attachmentsData = await getAttachmentsData();

    const resolvedAttachments: Attachment[] = await Promise.all(
      Object.values(attachmentsData).map(async (attachment: any) => {
        const attachmentPlatformUUID = {
          uuid: platformsData[attachment.platform].uuid
        };

        const platform = await connection
          .getRepository(Platform)
          .findOneBy(attachmentPlatformUUID);

        attachment.platform = plainToInstance(Platform, platform, {
          ignoreDecorators: true
        });

        const attachmentInstance = plainToInstance(Attachment, attachment, {
          ignoreDecorators: true
        });

        return attachmentInstance;
      })
    );

    await connection.manager.save(resolvedAttachments);
  }
}
