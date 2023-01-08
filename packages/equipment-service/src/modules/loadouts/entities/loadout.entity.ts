import { Exclude, Expose } from 'class-transformer';
import { PerkPackage } from '../../perks/entities';
import { WeaponDto } from '../../weapons/dtos';

@Exclude()
export class Loadout {
  constructor(
    uuid: string,
    primaryWeapon: WeaponDto,
    secondaryWeapon: WeaponDto
  ) {
    this.uuid = uuid;
    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = secondaryWeapon;
  }

  @Expose()
  uuid!: string;

  @Expose()
  primaryWeapon!: WeaponDto;

  @Expose()
  secondaryWeapon!: WeaponDto;

  @Expose()
  perkPackage?: PerkPackage;
}
