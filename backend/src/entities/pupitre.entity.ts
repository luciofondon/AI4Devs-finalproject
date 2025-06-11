import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum PupitreStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

export enum ReaderStatus {
  OK = 'OK',
  KO = 'KO',
}

export enum PrinterStatus {
  OK = 'OK',
  KO = 'KO',
}

export enum ModemStatus {
  OK = 'OK',
  KO = 'KO',
}

export enum GPSStatus {
  OK = 'OK',
  KO = 'KO',
}

@Entity('pupitres')
export class Pupitre {
  @PrimaryColumn({ length: 8 })
  id: string;

  // Campo calculado, no se almacena en la BD
  status?: PupitreStatus;

  @Column({ name: 'bus_id', length: 4, nullable: false })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.pupitres, { 
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
    name: 'qr_status',
  })
  qrStatus: ReaderStatus;

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

  @Column({
    type: 'enum',
    enum: PrinterStatus,
    default: PrinterStatus.OK,
    name: 'printer_status',
  })
  printerStatus: PrinterStatus;

  @Column({
    type: 'enum',
    enum: ModemStatus,
    default: ModemStatus.OK,
    name: 'modem_status',
  })
  modemStatus: ModemStatus;

  @Column({
    type: 'enum',
    enum: GPSStatus,
    default: GPSStatus.OK,
    name: 'gps_status',
  })
  gpsStatus: GPSStatus;
} 