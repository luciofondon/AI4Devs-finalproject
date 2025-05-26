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

export interface Bus {
  id: string;
  status: BusStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Pupitre {
  id: string;
  status: PupitreStatus;
  busId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Validator {
  id: string;
  status: ValidatorStatus;
  busId: string;
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