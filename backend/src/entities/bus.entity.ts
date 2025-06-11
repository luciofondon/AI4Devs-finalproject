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

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @OneToMany(() => Pupitre, pupitre => pupitre.bus, { eager: true })
  pupitres: Pupitre[];

  @OneToMany(() => Validator, validator => validator.bus, { eager: true })
  validators: Validator[];

  @OneToMany(() => Camera, camera => camera.bus)
  cameras: Camera[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 