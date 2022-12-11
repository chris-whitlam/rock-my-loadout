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

class TuningDto {
  @IsOptional()
  @IsNumber()
  x?: number;

  @IsOptional()
  @IsNumber()
  y?: number;
}

class AttachmentDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsOptional()
  tuning?: TuningDto;
}

class WeaponDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @Type(() => AttachmentDto)
  @IsNotEmpty()
  attachments: AttachmentDto[];
}

export class CreateLoadoutDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => WeaponDto)
  primaryWeapon: WeaponDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => WeaponDto)
  secondaryWeapon: WeaponDto;
}
