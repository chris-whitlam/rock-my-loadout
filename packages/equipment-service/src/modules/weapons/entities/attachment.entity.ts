import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Weapon } from './weapon.entity';

enum AttachmentSlot {
  BARREL = 'Barrel',
  MUZZLE = 'Muzzle',
}

interface TuningSetting {
  name: string;
  max: number;
  min: number;
}

interface Tuning {
  x: TuningSetting;
  y: TuningSetting;
}

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AttachmentSlot,
  })
  attachmentSlot: AttachmentSlot;

  @ManyToMany((type) => Weapon)
  weapons: Weapon[];

  @Column({
    type: 'jsonb',
  })
  tuning?: Tuning;
}
