import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated
} from 'typeorm';
import { Attachment, AttachmentSlot } from './attachment.entity';
import { Platform } from './platform.entity';

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

@Entity('weapons')
export class Weapon {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({
    type: 'enum',
    enum: WeaponType,
    nullable: false
  })
  type!: WeaponType;

  @Column({ type: 'jsonb', nullable: true })
  attachmentSlots?: AttachmentSlot[]; // If null, will use default for that weapon type, otherwise use what's defined here

  @ManyToOne(() => Platform, (platform) => platform.weapons, {
    cascade: ['insert', 'update'],
    nullable: true // Because riot shield
  })
  platform: Platform;

  attachments!: Record<string, Attachment[]>;
}
