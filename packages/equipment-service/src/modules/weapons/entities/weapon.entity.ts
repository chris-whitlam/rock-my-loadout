import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
  ManyToMany
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Platform } from './platform.entity';

export enum WeaponType {
  ASSAULT_RIFLE = 'Assault Rifle'
}

@Exclude()
@Entity('weapons')
export class Weapon {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Expose()
  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Expose()
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: WeaponType,
    nullable: false
  })
  type!: WeaponType;

  @Expose()
  @ManyToOne(() => Platform, (platform) => platform.weapons, {
    // cascade: ['insert', 'update'],
    nullable: false
  })
  platform!: Platform;

  @Expose()
  attachments!: Attachment[];
}
