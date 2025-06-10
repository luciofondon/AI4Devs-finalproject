import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum ValidatorStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

export enum ReaderStatus {
  OK = 'OK',
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

  @Column({
    type: 'enum',
    enum: ReaderStatus,
    default: ReaderStatus.OK,
    name: 'rfid_status',
  })
  rfidStatus: ReaderStatus;

  @Column({
    type: 'enum',
    enum: ReaderStatus,
    default: ReaderStatus.OK,
    name: 'emv_status',
  })
  emvStatus: ReaderStatus;

  @Column({ name: 'bus_id', length: 4 })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.validators)
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 