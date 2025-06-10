import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum ValidatorStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

@Entity('validators')
export class Validator {
  @PrimaryColumn({ length: 8 })
  id: string;

  @Column({
    type: 'enum',
    enum: ValidatorStatus,
    default: ValidatorStatus.OK,
  })
  status: ValidatorStatus;

  @Column({ name: 'bus_id', length: 4 })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.validators)
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 