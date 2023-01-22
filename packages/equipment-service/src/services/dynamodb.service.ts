import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { LoadoutDto } from 'src/modules/loadouts/dto';

@Injectable()
export class DynamoDBService {
  private client: DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient({
      endpoint: process.env.DYNAMODB_ENDPOINT
    });
  }

  public async getByKey(tableName: string, uuid: string) {
    try {
      const { Item } = await this.client
        .get({
          TableName: tableName,
          Key: { uuid }
        })
        .promise();

      return Item;
    } catch (e) {
      console.error(e);
      throw new NotFoundException(e);
    }
  }

  public async getAllByAttributes(
    tableName: string,
    attributes: any,
    limit = undefined
  ) {
    try {
      let filterExpression = '';
      let expressionAttributeNames = {};
      let expressionAttributeValues = {};

      Object.entries(attributes).map(([key, value]) => {
        filterExpression = filterExpression.concat(`#${key} = :${key}`);
        expressionAttributeNames = {
          ...expressionAttributeNames,
          [`#${key}`]: key
        };
        expressionAttributeValues = {
          ...expressionAttributeValues,
          [`:${key}`]: value
        };
      });

      const { Items } = await this.client
        .scan({
          TableName: tableName,
          FilterExpression: filterExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
          Limit: limit
        })
        .promise();
      return Items;
    } catch (e) {
      console.error(e);
      throw new NotFoundException(e);
    }
  }

  public async save(tableName: string, data: any) {
    try {
      console.log(tableName);

      return this.client
        .put({
          TableName: tableName,
          Item: data
        })
        .promise();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
