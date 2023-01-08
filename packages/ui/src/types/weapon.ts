import { Attachment } from './attachment';

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

export interface BaseWeapon {
  uuid: string;
  name: string;
  type: WeaponType;
}

export enum WeaponSlot {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface Weapon extends BaseWeapon {
  attachments: Attachment;
}

export interface LoadoutWeapon extends BaseWeapon {
  attachments?: Record<string, Attachment>;
}
