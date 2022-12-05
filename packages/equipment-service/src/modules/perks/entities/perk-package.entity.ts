import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { Perk } from './perk.entity';

@Entity('perk_packages')
export class PerkPackage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @ManyToMany(() => Perk, (perk) => perk.perkPackages, {
    cascade: true,
    nullable: false
  })
  @JoinTable({ name: 'perk_package_perks' })
  perks!: Perk[];
}
