import { IsEnum, IsOptional } from 'class-validator';
import { PerkType } from '../types';

export class GetPerksDto {
  @IsEnum(PerkType)
  @IsOptional()
  type?: PerkType;
}
