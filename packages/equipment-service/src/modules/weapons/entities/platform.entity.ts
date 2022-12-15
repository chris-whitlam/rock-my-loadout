import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { Weapon } from './weapon.entity';

@Entity('platforms')
@Exclude()
export class Platform {
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

  @Expose()
  @OneToMany(() => Attachment, (attachment) => attachment.platform, {
    cascade: true
  })
  attachments!: Attachment[];
}
