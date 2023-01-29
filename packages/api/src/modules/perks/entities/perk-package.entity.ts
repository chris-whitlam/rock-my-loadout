import { Exclude, Expose } from 'class-transformer';
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

  @ManyToMany(() => Perk, (perk) => perk.perkPackages, {
    cascade: true,
    nullable: false
  })
  @JoinTable({ name: 'perk_package_perks' })
  perks!: Perk[];
}
