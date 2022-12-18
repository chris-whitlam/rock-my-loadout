import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToOne
} from 'typeorm';
import { Platform } from './platform.entity';
import { Weapon } from './weapon.entity';

export enum AttachmentSlot {
  BARREL = 'Barrel',
  MUZZLE = 'Muzzle',
  UNDERBARREL = 'Underbarrel',
  STOCK = 'Stock',
  REAR_GRIP = 'Rear Grip',
  MAGAZINE = 'Magazine',
  LASER = 'Laser',
  AMMUNITION = 'Ammunition',
  OPTIC = 'Optic',
  GUARD = 'Guard',
  COMB = 'Comb',
  BOLT = 'Bolt',
  RAIL = 'Rail'
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
  value?: number;
  unit: TuningUnit;
  metric: TuningProperty;
  max: TuningSetting;
  min: TuningSetting;
}

interface Tuning {
  x: TuningOption;
  y: TuningOption;
}

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({
    type: 'enum',
    enum: AttachmentSlot,
    nullable: false
  })
  attachmentSlot!: AttachmentSlot;

  @Column({
    type: 'jsonb',
    nullable: true
  })
  tuning?: Tuning;

  @ManyToOne(() => Platform, (platform) => platform.attachments, {
    cascade: false,
    nullable: true // Null means its a universal attachment
  })
  platform!: Platform;

  weapons!: Weapon[];
}
