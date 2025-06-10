import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Bus } from '../../entities/bus.entity';
import { Pupitre } from '../../entities/pupitre.entity';
import { Validator } from '../../entities/validator.entity';
import { Camera } from '../../entities/camera.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus, Pupitre, Validator, Camera]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {} 