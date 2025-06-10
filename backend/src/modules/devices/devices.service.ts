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
    const buses = await this.busRepository.find({
      relations: ['pupitres', 'validators']
    });
    
    // Añadir el estado calculado a cada bus
    const busesWithStatus = buses.map(bus => ({
      ...bus,
      status: this.calculateBusStatus(bus)
    }));

    if (status) {
      const filteredBuses = busesWithStatus.filter(bus => bus.status === status);
      this.logger.debug(`Found ${filteredBuses.length} buses with status ${status}`);
      return filteredBuses;
    }
    this.logger.debug(`Found ${buses.length} buses without status filter`);
    return busesWithStatus;
  }

  async findBusById(id: string): Promise<Bus | null> {
    const bus = await this.busRepository.findOne({ 
      where: { id },
      relations: ['pupitres', 'validators']
    });
    
    if (bus) {
      return {
        ...bus,
        status: this.calculateBusStatus(bus)
      };
    }
    return null;
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
    const savedPupitre = await this.pupitreRepository.save(pupitre);
    await this.recalculateBusStatus(pupitre.busId);
    return savedPupitre;
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
    const savedValidator = await this.validatorRepository.save(validator);
    await this.recalculateBusStatus(validator.busId);
    return savedValidator;
  }

  // Métodos para Cámaras
  async findAllCameras(status?: CameraStatus): Promise<Camera[]> {
    this.logger.debug(`findAllCameras called with status: ${status}`);
    if (status) {
      const cameras = await this.cameraRepository.createQueryBuilder('camera')
        .where('camera.status = :status', { status })
        .getMany();
      this.logger.debug(`Found ${cameras.length} cameras with status ${status}`);
      return cameras;
    }
    const allCameras = await this.cameraRepository.find();
    this.logger.debug(`Found ${allCameras.length} cameras without status filter`);
    return allCameras;
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

  private async recalculateBusStatus(busId: string): Promise<void> {
    // Obtener todos los pupitres y validadores del bus
    const pupitres = await this.pupitreRepository.find({ where: { busId } });
    const validators = await this.validatorRepository.find({ where: { busId } });

    // El estado del bus se calcula dinámicamente, no se almacena en la BD
    // Por lo tanto, no es necesario actualizar el estado del bus aquí
  }

  // Método para calcular el estado del bus en caliente
  private calculateBusStatus(bus: Bus): BusStatus {
    const pupitres = bus.pupitres || [];
    const validators = bus.validators || [];

    if (pupitres.some(p => p.status === PupitreStatus.KO) || validators.some(v => v.status === ValidatorStatus.KO)) {
      return BusStatus.KO;
    }
    if (pupitres.some(p => p.status === PupitreStatus.WARNING) || validators.some(v => v.status === ValidatorStatus.WARNING)) {
      return BusStatus.WARNING;
    }
    return BusStatus.OK;
  }
} 