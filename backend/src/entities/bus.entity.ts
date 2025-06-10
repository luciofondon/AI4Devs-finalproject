import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pupitre } from './pupitre.entity';
import { Validator } from './validator.entity';
import { Camera } from './camera.entity';

export enum BusStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

@Entity('buses')
export class Bus {
  @PrimaryColumn({ length: 4 })
  id: string;

  @Column({ type: 'enum', enum: BusStatus, nullable: true })
  status?: BusStatus;

  @OneToMany(() => Pupitre, pupitre => pupitre.bus)
  pupitres: Pupitre[];

  @OneToMany(() => Validator, validator => validator.bus)
  validators: Validator[];

  @OneToMany(() => Camera, camera => camera.bus)
  cameras: Camera[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 