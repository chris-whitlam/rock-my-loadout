import { LoadoutWeapon, WeaponSlot } from './weapon';

export interface Loadout {
  [WeaponSlot.PRIMARY]: LoadoutWeapon;
  [WeaponSlot.SECONDARY]: LoadoutWeapon;
}
