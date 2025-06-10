import { Controller, Get, Param, Put, Body, NotFoundException, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Bus, BusStatus } from '../../entities/bus.entity';
import { Pupitre, PupitreStatus } from '../../entities/pupitre.entity';
import { Validator, ValidatorStatus } from '../../entities/validator.entity';
import { Camera, CameraStatus } from '../../entities/camera.entity';

@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('buses')
  async findAllBuses(@Query('status') status?: string): Promise<Bus[]> {
    console.log('Valor recibido en status (buses):', status);
    const statusEnum = status?.toUpperCase() as BusStatus;
    if (!Object.values(BusStatus).includes(statusEnum)) {
      return this.devicesService.findAllBuses();
    }
    return this.devicesService.findAllBuses(statusEnum);
  }

  @Get('buses/:id')
  async findBusById(@Param('id') id: string): Promise<Bus> {
    const bus = await this.devicesService.findBusById(id);
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return bus;
  }

  @Put('buses/:id/status')
  async updateBusStatus(
    @Param('id') id: string,
    @Body('status') status: BusStatus,
  ): Promise<Bus> {
    const bus = await this.devicesService.findBusById(id);
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return this.devicesService.updateBusStatus(id, status);
  }

  @Get('pupitres')
  async findAllPupitres(@Query('status') status?: string): Promise<Pupitre[]> {
    console.log('Valor recibido en status (pupitres):', status);
    const statusEnum = status && Object.values(PupitreStatus).includes(status as PupitreStatus) ? status as PupitreStatus : undefined;
    return this.devicesService.findAllPupitres(statusEnum);
  }

  @Get('pupitres/:id')
  async findPupitreById(@Param('id') id: string): Promise<Pupitre> {
    const pupitre = await this.devicesService.findPupitreById(id);
    if (!pupitre) {
      throw new NotFoundException(`Pupitre with ID ${id} not found`);
    }
    return pupitre;
  }

  @Put('pupitres/:id/status')
  async updatePupitreStatus(
    @Param('id') id: string,
    @Body('status') status: PupitreStatus,
  ): Promise<Pupitre> {
    const pupitre = await this.devicesService.findPupitreById(id);
    if (!pupitre) {
      throw new NotFoundException(`Pupitre with ID ${id} not found`);
    }
    return this.devicesService.updatePupitreStatus(id, status);
  }

  @Get('validators')
  async findAllValidators(@Query('status') status?: string): Promise<Validator[]> {
    console.log('Valor recibido en status (validators):', status);
    const statusEnum = status && Object.values(ValidatorStatus).includes(status as ValidatorStatus) ? status as ValidatorStatus : undefined;
    return this.devicesService.findAllValidators(statusEnum);
  }

  @Get('validators/:id')
  async findValidatorById(@Param('id') id: string): Promise<Validator> {
    const validator = await this.devicesService.findValidatorById(id);
    if (!validator) {
      throw new NotFoundException(`Validator with ID ${id} not found`);
    }
    return validator;
  }

  @Put('validators/:id/status')
  async updateValidatorStatus(
    @Param('id') id: string,
    @Body('status') status: ValidatorStatus,
  ): Promise<Validator> {
    const validator = await this.devicesService.findValidatorById(id);
    if (!validator) {
      throw new NotFoundException(`Validator with ID ${id} not found`);
    }
    return this.devicesService.updateValidatorStatus(id, status);
  }

  @Get('cameras')
  async findAllCameras(): Promise<Camera[]> {
    return this.devicesService.findAllCameras();
  }

  @Get('cameras/:id')
  async findCameraById(@Param('id') id: string): Promise<Camera> {
    const camera = await this.devicesService.findCameraById(id);
    if (!camera) {
      throw new NotFoundException(`Camera with ID ${id} not found`);
    }
    return camera;
  }

  @Put('cameras/:id/status')
  async updateCameraStatus(
    @Param('id') id: string,
    @Body('status') status: CameraStatus,
  ): Promise<Camera> {
    const camera = await this.devicesService.findCameraById(id);
    if (!camera) {
      throw new NotFoundException(`Camera with ID ${id} not found`);
    }
    return this.devicesService.updateCameraStatus(id, status);
  }
} 