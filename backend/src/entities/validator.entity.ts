import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
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

  // Campo calculado, no se almacena en la BD
  status?: ValidatorStatus;

  @Column({ name: 'bus_id', length: 4, nullable: false })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.validators, { 
    eager: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
} 