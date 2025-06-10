import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum PupitreStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

@Entity('pupitres')
export class Pupitre {
  @PrimaryColumn({ length: 8 })
  id: string;

  @Column({
    type: 'enum',
    enum: PupitreStatus,
    default: PupitreStatus.OK,
  })
  status: PupitreStatus;

  @Column({ name: 'bus_id', length: 4, nullable: false })
  busId: string;

  @ManyToOne(() => Bus, bus => bus.pupitres)
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 