import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested
} from 'class-validator';

export class CreateLoadoutTuningDto {
  @IsOptional()
  @IsNumber()
  x?: number;

  @IsOptional()
  @IsNumber()
  y?: number;
}

export class CreateLoadoutAttachmentDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsOptional()
  tuning?: CreateLoadoutTuningDto;
}

export class CreateLoadoutWeaponDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @Type(() => CreateLoadoutAttachmentDto)
  @IsNotEmpty()
  attachments: CreateLoadoutAttachmentDto[];
}

export class CreateLoadoutDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateLoadoutWeaponDto)
  primaryWeapon: CreateLoadoutWeaponDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateLoadoutWeaponDto)
  secondaryWeapon: CreateLoadoutWeaponDto;
}
