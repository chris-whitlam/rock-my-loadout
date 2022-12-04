import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  Generated,
  JoinTable
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Platform } from './platform.entity';

export enum WeaponType {
  ASSAULT_RIFLE = 'Assault Rifle'
}

@Entity('weapons')
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WeaponType
  })
  type: WeaponType;

  @ManyToOne(() => Platform, (platform) => platform.weapons, {
    cascade: ['insert'],
    nullable: false
  })
  platform: Platform;

  @ManyToMany(() => Attachment, { cascade: true, nullable: false })
  @JoinTable({ name: 'weapon_attachments' })
  attachments: Attachment[];
}
