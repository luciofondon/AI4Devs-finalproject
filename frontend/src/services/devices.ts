import api from './api';
import type { Bus, Pupitre, Validator, Camera } from '../types';
import { BusStatus, PupitreStatus, ValidatorStatus, CameraStatus } from '../types';

export const devicesService = {
  // Buses
  getBuses: async (status?: BusStatus): Promise<Bus[]> => {
    const response = await api.get('/buses', { params: { status } });
    return response.data;
  },

  getBusById: async (id: string): Promise<Bus> => {
    const response = await api.get(`/buses/${id}`);
    return response.data;
  },

  updateBusStatus: async (id: string, status: BusStatus): Promise<Bus> => {
    const response = await api.put(`/buses/${id}/status`, { status });
    return response.data;
  },

  // Pupitres
  getPupitres: async (status?: PupitreStatus): Promise<Pupitre[]> => {
    const response = await api.get('/pupitres', { params: { status } });
    return response.data;
  },

  getPupitreById: async (id: string): Promise<Pupitre> => {
    const response = await api.get(`/pupitres/${id}`);
    return response.data;
  },

  updatePupitreStatus: async (id: string, status: PupitreStatus): Promise<Pupitre> => {
    const response = await api.put(`/pupitres/${id}/status`, { status });
    return response.data;
  },

  // Validadores
  getValidators: async (status?: ValidatorStatus): Promise<Validator[]> => {
    const response = await api.get('/validators', { params: { status } });
    return response.data;
  },

  getValidatorById: async (id: string): Promise<Validator> => {
    const response = await api.get(`/validators/${id}`);
    return response.data;
  },

  updateValidatorStatus: async (id: string, status: ValidatorStatus): Promise<Validator> => {
    const response = await api.put(`/validators/${id}/status`, { status });
    return response.data;
  },

  // Cámaras
  getCameras: async (): Promise<Camera[]> => {
    const response = await api.get('/cameras');
    return response.data;
  },

  getCameraById: async (id: string): Promise<Camera> => {
    const response = await api.get(`/cameras/${id}`);
    return response.data;
  },

  updateCameraStatus: async (id: string, status: CameraStatus): Promise<Camera> => {
    const response = await api.put(`/cameras/${id}/status`, { status });
    return response.data;
  },
}; 