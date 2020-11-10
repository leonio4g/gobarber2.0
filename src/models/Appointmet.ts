import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')

  id: string;
  @Column()
  provider : string;

  @Column()
  date : Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
