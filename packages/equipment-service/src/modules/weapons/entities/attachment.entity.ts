import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { Platform } from './platform.entity';
import { Weapon } from './weapon.entity';

export enum AttachmentSlot {
  BARREL = 'Barrel',
  MUZZLE = 'Muzzle',
  UNDERBARREL = 'Underbarrel'
}

enum TuningUnit {
  INCHES = 'in',
  OUNCES = 'oz'
}

enum TuningProperty {
  LENGTH = 'Length',
  WEIGHT = 'Weight'
}

enum Tunable {
  HIP_FIRE_ACCURACY = 'Hip Fire Accuracy',
  AIM_DOWN_SIGHT_SPEED = 'Aim Down Sight Speed'
}

interface TuningSetting {
  name: Tunable;
  value: number;
}

interface TuningOption {
  unit: TuningUnit;
  metric: TuningProperty;
  max: TuningSetting;
  min: TuningSetting;
}

interface Tuning {
  x: TuningOption;
  y: TuningOption;
}

@Exclude()
@Entity('attachments')
export class Attachment {
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
    enum: AttachmentSlot,
    nullable: false
  })
  attachmentSlot!: AttachmentSlot;

  @Expose()
  @Column({
    type: 'jsonb',
    nullable: true
  })
  tuning?: Tuning;

  @Expose()
  @ManyToOne(() => Platform, (platform) => platform.attachments, {
    cascade: ['insert', 'update'],
    nullable: true // Null means its a universal attachment
  })
  platform!: Platform;

  @Expose()
  weapons!: Weapon[];
}
