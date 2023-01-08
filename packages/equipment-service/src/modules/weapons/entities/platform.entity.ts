import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated
} from 'typeorm';
import { Weapon } from './weapon.entity';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @OneToMany(() => Weapon, (weapon) => weapon.platform, {
    cascade: true
  })
  weapons!: Weapon[];
}
