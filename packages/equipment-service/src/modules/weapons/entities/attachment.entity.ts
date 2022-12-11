import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Generated
} from 'typeorm';
import { Weapon } from './weapon.entity';

enum AttachmentSlot {
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

  @ManyToMany(() => Weapon, (weapon) => weapon.attachments)
  weapons!: Weapon[];
}
