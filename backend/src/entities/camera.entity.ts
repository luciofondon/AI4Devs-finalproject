import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum CameraStatus {
  OK = 'OK',
  KO = 'KO',
}

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export enum QualityStatus {
  GOOD = 'GOOD',
  MEDIUM = 'MEDIUM',
  POOR = 'POOR',
}

@Entity('cameras')
export class Camera {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: CameraStatus,
    default: CameraStatus.OK,
  })
  status: CameraStatus;

  @Column({
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.CONNECTED,
  })
  connection: ConnectionStatus;

  @Column({
    type: 'enum',
    enum: QualityStatus,
    default: QualityStatus.GOOD,
  })
  quality: QualityStatus;

  @Column({ name: 'bus_id', length: 4 })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.cameras, {
    eager: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 