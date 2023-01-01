export enum WeaponType {
  ASSAULT_RIFLE = 'Assault Rifle',
  BATTLE_RIFLE = 'Battle Rifle',
  SMG = 'SMG',
  SHOTGUN = 'Shotgun',
  LMG = 'LMG',
  MARKSMAN_RIFLE = 'Marksman Rifle',
  SNIPER_RIFLE = 'Sniper Rifle',
  MELEE = 'Melee',
  HANDGUN = 'Handgun',
  LAUNCHER = 'Launcher'
}

export interface Weapon {
  uuid: string;
  name: string;
  type: WeaponType;
  attachmentSlots: string[];
}
