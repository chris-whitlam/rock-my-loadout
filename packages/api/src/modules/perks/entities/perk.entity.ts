import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToMany
} from 'typeorm';
import { PerkType } from '../types';
import { PerkPackage } from './perk-package.entity';

@Entity('perks')
export class Perk {
  @Exclude()
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
  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Expose()
  @Column({ type: 'enum', enum: PerkType, nullable: false })
  type!: PerkType;

  @ManyToMany(() => PerkPackage, (perkPackage) => perkPackage.perks, {
    cascade: ['insert'],
    nullable: true
  })
  perkPackages: PerkPackage;
}
