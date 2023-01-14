import { Exclude, Expose } from 'class-transformer';
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
  @OneToMany(() => Weapon, (weapon) => weapon.platform, {
    cascade: true
  })
  weapons!: Weapon[];
}
