import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus, BusStatus } from '../../entities/bus.entity';
import { Pupitre, PupitreStatus } from '../../entities/pupitre.entity';
import { Validator, ValidatorStatus } from '../../entities/validator.entity';
import { Camera, CameraStatus } from '../../entities/camera.entity';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
    @InjectRepository(Pupitre)
    private pupitreRepository: Repository<Pupitre>,
    @InjectRepository(Validator)
    private validatorRepository: Repository<Validator>,
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
  ) {}

  // Métodos para Buses
  async findAllBuses(status?: BusStatus): Promise<Bus[]> {
    this.logger.debug(`findAllBuses called with status: ${status}`);
    if (status) {
      const buses = await this.busRepository.createQueryBuilder('bus')
        .where('bus.status = :status', { status })
        .getMany();
      this.logger.debug(`Found ${buses.length} buses with status ${status}`);
      return buses;
    }
    const allBuses = await this.busRepository.find();
    this.logger.debug(`Found ${allBuses.length} buses without status filter`);
    return allBuses;
  }

  async findBusById(id: string): Promise<Bus | null> {
    return this.busRepository.findOne({ where: { id } });
  }

  async updateBusStatus(id: string, status: BusStatus): Promise<Bus> {
    const bus = await this.findBusById(id);
    if (!bus) {
      throw new Error(`Bus with ID ${id} not found`);
    }
    bus.status = status;
    return this.busRepository.save(bus);
  }

  // Métodos para Pupitres
  async findAllPupitres(status?: PupitreStatus): Promise<Pupitre[]> {
    this.logger.debug(`findAllPupitres called with status: ${status}`);
    if (status) {
      const pupitres = await this.pupitreRepository.createQueryBuilder('pupitre')
        .where('pupitre.status = :status', { status })
        .getMany();
      this.logger.debug(`Found ${pupitres.length} pupitres with status ${status}`);
      return pupitres;
    }
    const allPupitres = await this.pupitreRepository.find();
    this.logger.debug(`Found ${allPupitres.length} pupitres without status filter`);
    return allPupitres;
  }

  async findPupitreById(id: string): Promise<Pupitre | null> {
    return this.pupitreRepository.findOne({ where: { id } });
  }

  async updatePupitreStatus(id: string, status: PupitreStatus): Promise<Pupitre> {
    const pupitre = await this.findPupitreById(id);
    if (!pupitre) {
      throw new Error(`Pupitre with ID ${id} not found`);
    }
    pupitre.status = status;
    return this.pupitreRepository.save(pupitre);
  }

  // Métodos para Validadores
  async findAllValidators(status?: ValidatorStatus): Promise<Validator[]> {
    this.logger.debug(`findAllValidators called with status: ${status}`);
    if (status) {
      const validators = await this.validatorRepository.createQueryBuilder('validator')
        .where('validator.status = :status', { status })
        .getMany();
      this.logger.debug(`Found ${validators.length} validators with status ${status}`);
      return validators;
    }
    const allValidators = await this.validatorRepository.find();
    this.logger.debug(`Found ${allValidators.length} validators without status filter`);
    return allValidators;
  }

  async findValidatorById(id: string): Promise<Validator | null> {
    return this.validatorRepository.findOne({ where: { id } });
  }

  async updateValidatorStatus(id: string, status: ValidatorStatus): Promise<Validator> {
    const validator = await this.findValidatorById(id);
    if (!validator) {
      throw new Error(`Validator with ID ${id} not found`);
    }
    validator.status = status;
    return this.validatorRepository.save(validator);
  }

  // Métodos para Cámaras
  async findAllCameras(): Promise<Camera[]> {
    return this.cameraRepository.find();
  }

  async findCameraById(id: string): Promise<Camera | null> {
    return this.cameraRepository.findOne({ where: { id } });
  }

  async updateCameraStatus(id: string, status: CameraStatus): Promise<Camera> {
    const camera = await this.findCameraById(id);
    if (!camera) {
      throw new Error(`Camera with ID ${id} not found`);
    }
    camera.status = status;
    return this.cameraRepository.save(camera);
  }
} 