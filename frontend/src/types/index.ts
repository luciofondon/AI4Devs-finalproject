export enum BusStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

export enum PupitreStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

export enum ValidatorStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

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

export enum ReaderStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
}

export enum PrinterStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
  NO_PAPER = 'NO_PAPER',
  NO_RIBBON = 'NO_RIBBON',
}

export enum ModemStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
  NO_SIGNAL = 'NO_SIGNAL',
}

export enum GPSStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  KO = 'KO',
  NO_SIGNAL = 'NO_SIGNAL',
}

export interface Bus {
  id: string;
  status: BusStatus;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pupitre {
  id: string;
  status: PupitreStatus;
  busId: string;
  qrStatus: ReaderStatus;
  rfidStatus: ReaderStatus;
  emvStatus: ReaderStatus;
  printerStatus: PrinterStatus;
  modemStatus: ModemStatus;
  gpsStatus: GPSStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Validator {
  id: string;
  status: ValidatorStatus;
  busId: string;
  rfidStatus: ReaderStatus;
  emvStatus: ReaderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Camera {
  id: string;
  status: CameraStatus;
  connection: ConnectionStatus;
  quality: QualityStatus;
  busId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'driver' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: number;
  name: string;
  description: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  estimatedTime: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: number;
  routeId: number;
  busId: number;
  driverId: number;
  departureTime: string;
  arrivalTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 