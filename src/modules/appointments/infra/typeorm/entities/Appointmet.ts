import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')

  id: string;
  @Column()
  provider_id : string;

  @ManyToOne(() => User)
  @JoinColumn({ name : 'provider_id' })
  provider : User;

  @Column()
  date : Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
