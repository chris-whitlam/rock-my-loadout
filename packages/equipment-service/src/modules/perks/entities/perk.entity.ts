import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToMany
} from 'typeorm';
import { PerkPackage } from './perk-package.entity';

enum PerkType {
  BASE = 'Base',
  BONUS = 'Bonus',
  ULTIMATE = 'Ultimate'
}

@Entity('perks')
export class Perk {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Column({ type: 'enum', enum: PerkType, nullable: false })
  type!: PerkType;

  @ManyToMany(() => PerkPackage, (perkPackage) => perkPackage.perks, {
    cascade: ['insert'],
    nullable: true
  })
  perkPackages: PerkPackage;
}
