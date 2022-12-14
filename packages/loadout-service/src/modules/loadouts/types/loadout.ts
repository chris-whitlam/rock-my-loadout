export interface Weapon {
  uuid: string;
}

export interface Loadout {
  primaryWeapon: Weapon;
  secondaryWeapon: Weapon;
}
