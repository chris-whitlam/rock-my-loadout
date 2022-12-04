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
  id: number;

  @Column({ unique: true, type: 'varchar' })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Weapon, (weapon) => weapon.platform, {
    cascade: ['insert', 'remove']
  })
  weapons: Weapon[];
}
