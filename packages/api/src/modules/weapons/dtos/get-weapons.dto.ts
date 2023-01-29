import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WeaponType } from '../entities';

export class GetWeaponsDto {
  @IsOptional()
  @IsEnum(WeaponType)
  @Transform(() => WeaponType)
  type?: WeaponType;

  @IsOptional()
  @IsString()
  platform?: string;
}
