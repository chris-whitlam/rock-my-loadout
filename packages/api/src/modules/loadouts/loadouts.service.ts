import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { DynamoDBService } from '../../services';
import { WeaponService } from '../weapons';
import { Weapon } from '../weapons/entities';
import {
  CreateLoadoutAttachmentDto,
  CreateLoadoutDto,
  CreateLoadoutWeaponDto
} from './dto';
import { Loadout, LoadoutWeaponDto } from './entities';
import { v4 as uuid } from 'uuid';
import { User } from '../users/dto';
import { plainToClass } from 'class-transformer';
import { WeaponDto } from '../weapons/dtos';

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

  private async buildWeapon(
    storedWeapon: CreateLoadoutWeaponDto
  ): Promise<LoadoutWeaponDto> {
    const weaponData = await this.weaponService.getWeaponByUUID(
      storedWeapon.uuid
    );

    const validWeaponAttachments = this.getFlatAttachments(weaponData);

    const weaponAttachments = {};
    storedWeapon.attachments.map((selectedAttachment) => {
      const attachmentData = validWeaponAttachments.find(
        (validAttachment) => validAttachment.uuid === selectedAttachment.uuid
      );

      if (!attachmentData) {
        throw new UnprocessableEntityException('Loadout is invalid');
      }

      weaponAttachments[attachmentData.attachmentSlot] = {
        ...attachmentData,
        tuning: selectedAttachment.tuning
      };
    });

    return plainToClass(LoadoutWeaponDto, {
      ...weaponData,
      attachments: weaponAttachments
    });
  }

  private async buildLoadout(uuid: string, storedLoadout: CreateLoadoutDto) {
    const [primaryWeapon, secondaryWeapon] = await Promise.all([
      this.buildWeapon(storedLoadout.primaryWeapon),
      this.buildWeapon(storedLoadout.secondaryWeapon)
    ]);

    return plainToClass(Loadout, { uuid, primaryWeapon, secondaryWeapon });
  }

  private getFlatAttachments(weaponData: WeaponDto) {
    return Object.values(weaponData.attachments).reduce(
      (allAttachments, attachmentsInSlot) => [
        ...allAttachments,
        ...attachmentsInSlot
      ],
      []
    );
  }

  private async validateLoadoutWeapon(weapon: CreateLoadoutWeaponDto) {
    const weaponData = await this.weaponService.getWeaponByUUID(weapon.uuid);

    if (!weaponData) {
      throw new BadRequestException(`Weapon with id ${weapon.uuid} not found`);
    }

    if (weapon.attachments.length > 5) {
      throw new BadRequestException(
        `No more than 5 attachments allowed per weapon`
      );
    }

    const validAttachments = this.getFlatAttachments(weaponData);

    const selectedAttachmentSlots = [];
    weapon.attachments.map((attachment) => {
      const attachmentData = validAttachments.find(
        (validAttachment) => validAttachment.uuid === attachment.uuid
      );

      if (!attachmentData) {
        throw new BadRequestException(
          `Attachment with id ${attachment.uuid} not found or not applicable for this weapon`
        );
      }

      if (selectedAttachmentSlots.includes(attachmentData.attachmentSlot)) {
        throw new BadRequestException(
          `Attachment already selected for ${attachmentData.attachmentSlot} attachment slot`
        );
      }

      // Validate Tuning (is applicable, within ranges)
      // Validate

      selectedAttachmentSlots.push(attachmentData.attachmentSlot);

      return attachment;
    });
  }

  private async validateLoadout(loadoutDto: CreateLoadoutDto) {
    await this.validateLoadoutWeapon(loadoutDto.primaryWeapon);
    await this.validateLoadoutWeapon(loadoutDto.secondaryWeapon);
  }

  public async getLoadoutByUUID(uuid: string): Promise<Loadout> {
    const storedLoadout = (await this.dynamoDBService.getByKey(
      this.tableName,
      uuid
    )) as CreateLoadoutDto;

    if (!storedLoadout) {
      throw new NotFoundException(`Couldn't find loadout with id ${uuid}`);
    }

    return this.buildLoadout(uuid, storedLoadout);
  }

  public async createLoadout(
    data: CreateLoadoutDto,
    user: User
  ): Promise<{ uuid: string }> {
    await this.validateLoadout(data);

    const loadoutObject = {
      ...data,
      uuid: uuid(),
      userUUID: user.uuid,
      createdAt: new Date().toISOString()
    };

    await this.dynamoDBService.save(this.tableName, loadoutObject);

    return { uuid: loadoutObject.uuid };
  }
}
