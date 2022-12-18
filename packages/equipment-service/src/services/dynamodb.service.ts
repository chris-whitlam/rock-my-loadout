import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { LoadoutDto } from 'src/modules/loadouts/dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DynamoDBService {
  private client: DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient({
      endpoint: process.env.DYNAMODB_ENDPOINT
    });
  }

  public async getLoadoutByUUID(uuid: string): Promise<LoadoutDto> {
    try {
      const { Item } = await this.client
        .get({
          TableName: 'loadouts',
          Key: { uuid }
        })
        .promise();

      return Item as LoadoutDto;
    } catch (e) {
      console.error(e);
      throw new NotFoundException(e);
    }
  }

  public async saveLoadout(loadout: LoadoutDto): Promise<{ uuid: string }> {
    try {
      const loadoutObject = {
        ...loadout,
        uuid: uuid(),
        createdAt: new Date().toISOString()
      };

      await this.client
        .put({
          TableName: 'loadouts',
          Item: loadoutObject
        })
        .promise();

      return { uuid: loadoutObject.uuid };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
