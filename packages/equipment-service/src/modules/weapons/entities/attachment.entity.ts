import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

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
  RAIL = 'Rail',
  TRIGGER_ACTION = 'Trigger Action'
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
  @Exclude()
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
}
