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

enum TuningMetric {
  LENGTH = 'Length'
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
  metric: TuningMetric;
  max: TuningSetting;
  min: TuningSetting;
}

interface Tuning {
  x: TuningOption;
  y: TuningOption;
}

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AttachmentSlot
  })
  attachmentSlot: AttachmentSlot;

  @ManyToMany(() => Weapon, { cascade: true })
  weapons: Weapon[];

  @Column({
    type: 'jsonb',
    nullable: true
  })
  tuning?: Tuning;
}
