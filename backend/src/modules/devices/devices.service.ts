import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus, BusStatus } from '../../entities/bus.entity';
import { Pupitre, PupitreStatus } from '../../entities/pupitre.entity';
import { Validator, ValidatorStatus } from '../../entities/validator.entity';
import { Camera, CameraStatus } from '../../entities/camera.entity';
import { ModemStatus, GPSStatus, ReaderStatus, PrinterStatus } from '../../entities/pupitre.entity';

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
    const pupitres = await this.pupitreRepository.find();
    
    // Añadir el estado calculado a cada pupitre
    const pupitresWithStatus = pupitres.map(pupitre => ({
      ...pupitre,
      status: this.calculatePupitreStatus(pupitre)
    }));

    if (status) {
      const filteredPupitres = pupitresWithStatus.filter(pupitre => pupitre.status === status);
      this.logger.debug(`Found ${filteredPupitres.length} pupitres with status ${status}`);
      return filteredPupitres;
    }
    this.logger.debug(`Found ${pupitres.length} pupitres without status filter`);
    return pupitresWithStatus;
  }

  async findPupitreById(id: string): Promise<Pupitre | null> {
    const pupitre = await this.pupitreRepository.findOne({ where: { id } });
    if (pupitre) {
      return {
        ...pupitre,
        status: this.calculatePupitreStatus(pupitre)
      };
    }
    return null;
  }

  async updatePupitreStatus(id: string, status: PupitreStatus): Promise<Pupitre> {
    const pupitre = await this.findPupitreById(id);
    if (!pupitre) {
      throw new Error(`Pupitre with ID ${id} not found`);
    }
    // El estado se calcula dinámicamente, no se actualiza directamente
    return pupitre;
  }

  // Método para calcular el estado del pupitre en caliente
  private calculatePupitreStatus(pupitre: Pupitre): PupitreStatus {
    const {
      modemStatus,
      gpsStatus,
      emvStatus,
      rfidStatus,
      printerStatus,
      qrStatus
    } = pupitre;

    // Si todos los componentes están en KO
    if (
      modemStatus === ModemStatus.KO &&
      gpsStatus === GPSStatus.KO &&
      emvStatus === ReaderStatus.KO &&
      rfidStatus === ReaderStatus.KO &&
      printerStatus === PrinterStatus.KO &&
      qrStatus === ReaderStatus.KO
    ) {
      return PupitreStatus.KO;
    }

    // Si MODEM, GPS, RFID, EMV o IMPRESORA está en KO
    if (
      modemStatus === ModemStatus.KO ||
      gpsStatus === GPSStatus.KO ||
      emvStatus === ReaderStatus.KO ||
      rfidStatus === ReaderStatus.KO ||
      printerStatus === PrinterStatus.KO
    ) {
      return PupitreStatus.KO;
    }

    // Si algún otro componente está en KO (por ejemplo QR)
    if (
      qrStatus === ReaderStatus.KO
    ) {
      return PupitreStatus.WARNING;
    }

    // Si todos los componentes están en OK
    return PupitreStatus.OK;
  }

  // Métodos para Validadores
  async findAllValidators(status?: ValidatorStatus): Promise<Validator[]> {
    this.logger.debug(`findAllValidators called with status: ${status}`);
    const validators = await this.validatorRepository.find();
    
    // Añadir el estado calculado a cada validador
    const validatorsWithStatus = validators.map(validator => ({
      ...validator,
      status: this.calculateValidatorStatus(validator)
    }));

    if (status) {
      const filteredValidators = validatorsWithStatus.filter(validator => validator.status === status);
      this.logger.debug(`Found ${filteredValidators.length} validators with status ${status}`);
      return filteredValidators;
    }
    this.logger.debug(`Found ${validators.length} validators without status filter`);
    return validatorsWithStatus;
  }

  async findValidatorById(id: string): Promise<Validator | null> {
    const validator = await this.validatorRepository.findOne({ where: { id } });
    if (validator) {
      return {
        ...validator,
        status: this.calculateValidatorStatus(validator)
      };
    }
    return null;
  }

  async updateValidatorStatus(id: string, status: ValidatorStatus): Promise<Validator> {
    const validator = await this.findValidatorById(id);
    if (!validator) {
      throw new Error(`Validator with ID ${id} not found`);
    }
    // El estado se calcula dinámicamente, no se actualiza directamente
    return validator;
  }

  // Método para calcular el estado del validador en caliente
  private calculateValidatorStatus(validator: Validator): ValidatorStatus {
    // Si ambos componentes están en KO, el validador está en KO
    if (
      validator.rfidStatus === ReaderStatus.KO &&
      validator.emvStatus === ReaderStatus.KO
    ) {
      return ValidatorStatus.KO;
    }

    // Si ambos componentes están en OK, el validador está en OK
    if (
      validator.rfidStatus === ReaderStatus.OK &&
      validator.emvStatus === ReaderStatus.OK
    ) {
      return ValidatorStatus.OK;
    }

    // En cualquier otro caso, el validador está en WARNING
    return ValidatorStatus.WARNING;
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