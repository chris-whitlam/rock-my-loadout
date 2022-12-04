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
    cascade: ['insert'],
    nullable: false
  })
  platform!: Platform;

  @ManyToMany(() => Attachment, (attachment) => attachment.weapons, {
    cascade: true,
    createForeignKeyConstraints: false
  })
  @JoinTable({ name: 'weapon_attachments' })
  attachments!: Attachment[];
}
