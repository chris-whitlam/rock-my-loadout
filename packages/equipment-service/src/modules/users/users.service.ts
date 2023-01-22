import { DynamoDBService } from '@/services';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  tableName = 'users';

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  public async createUser(username: string, password: string) {
    const user = {
      uuid: uuid(),
      username,
      password
    };

    return this.dynamoDBService.save(this.tableName, user);
  }

  public async getUserByUsername(username: string) {
    const users = await this.dynamoDBService.getAllByAttributes(
      this.tableName,
      {
        username
      },
      1
    );

    return users[0];
  }

  public async getUserByUUID(uuid: string) {
    return this.dynamoDBService.getByKey(this.tableName, uuid);
  }
}
