import { Exclude, Expose } from 'class-transformer';
import { PerkPackage } from '../../perks/entities';
import { Weapon } from '../../weapons/entities';

@Exclude()
export class Loadout {
  constructor(uuid: string, primaryWeapon: Weapon, secondaryWeapon: Weapon) {
    this.uuid = uuid;
    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon = secondaryWeapon;
  }

  @Expose()
  uuid!: string;

  @Expose()
  primaryWeapon!: Weapon;

  @Expose()
  secondaryWeapon!: Weapon;

  @Expose()
  perkPackage?: PerkPackage;
}
