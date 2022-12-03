import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Weapon } from './weapon.entity';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @OneToMany((type) => Weapon, (weapon) => weapon.platform)
  weapons: Weapon[];
}
