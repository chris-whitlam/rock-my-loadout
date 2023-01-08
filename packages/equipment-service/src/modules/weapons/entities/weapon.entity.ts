import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
  ManyToMany,
  JoinTable
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

  @ManyToOne(() => Platform, (platform) => platform.weapons, {
    cascade: ['insert', 'update'],
    nullable: true // Because riot shield
  })
  platform: Platform;

  @ManyToMany(() => Attachment, {
    nullable: true
  })
  @JoinTable({ name: 'weapon_attachments' })
  attachments!: Attachment[];
}
