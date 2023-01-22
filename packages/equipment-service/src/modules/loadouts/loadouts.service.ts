import { Injectable, NotFoundException } from '@nestjs/common';
import { DynamoDBService } from '../../services';
import { WeaponService } from '../weapons';
import { Weapon } from '../weapons/entities';
import { AttachmentDto, LoadoutDto, WeaponDto } from './dto';
import { Loadout } from './entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoadoutsService {
  tableName = 'loadouts';

  constructor(
    private readonly dynamoDBService: DynamoDBService,
    private readonly weaponService: WeaponService
  ) {}

  // private populateWeaponDetails(weapon: Weapon, weaponDto: WeaponDto) {
  //   const attachments = weaponDto.attachments.map(
  //     (attachmentDto: AttachmentDto) => {
  //       const attachment = weapon.attachments.find(
  //         ({ uuid }) => uuid === attachmentDto.uuid
  //       );

  //       attachment.tuning.x.value = attachmentDto.tuning.x;
  //       attachment.tuning.y.value = attachmentDto.tuning.y;

  //       return attachment;
  //     }
  //   );

  //   // weapon.attachments = attachments;
  //   return weapon;
  // }

  private async buildLoadout(uuid: string, storedLoadout: LoadoutDto) {
    const [primaryWeaponData, secondaryWeaponData] = await Promise.all([
      this.weaponService.getWeaponByUUID(storedLoadout.primaryWeapon.uuid),
      this.weaponService.getWeaponByUUID(storedLoadout.secondaryWeapon.uuid)
    ]);

    // const primaryWeapon = this.populateWeaponDetails(
    //   primaryWeaponData,
    //   storedLoadout.primaryWeapon
    // );
    // const secondaryWeapon = this.populateWeaponDetails(
    //   secondaryWeaponData,
    //   storedLoadout.secondaryWeapon
    // );

    return new Loadout(uuid, primaryWeaponData, secondaryWeaponData);
  }

  private async validateLoadout(loadoutDto: LoadoutDto) {
    // TO DO
    // Can't have more than one of each attachmentSlot
    // Can't have attachments for incompatible attachmentSlots
    // Can't have tuning on an attachment that doesn't have tuning
    // Must have a name, primary, secondary, lethal, tactical and perk package
  }

  public async getLoadoutByUUID(uuid: string): Promise<Loadout> {
    const storedLoadout = (await this.dynamoDBService.getByKey(
      this.tableName,
      uuid
    )) as LoadoutDto;

    if (!storedLoadout) {
      throw new NotFoundException(`Couldn't find loadout with id ${uuid}`);
    }

    return this.buildLoadout(uuid, storedLoadout);
  }

  public async createLoadout(data: LoadoutDto): Promise<{ uuid: string }> {
    await this.validateLoadout(data);

    const loadoutObject = {
      ...data,
      uuid: uuid(),
      createdAt: new Date().toISOString()
    };

    await this.dynamoDBService.save(this.tableName, data);

    return loadoutObject.uuid;
  }
}
