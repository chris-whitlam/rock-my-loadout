import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Platform } from './platform.entity';

enum WeaponType {
  ASSAULT_RIFLE = 'Assault Rifle',
}

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: WeaponType,
  })
  type: WeaponType;

  @ManyToOne((type) => Platform, (platform) => platform.weapons)
  platform: Platform;

  @ManyToMany((type) => Attachment)
  attachments: Attachment[];
}
