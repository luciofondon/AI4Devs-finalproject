import type { Bus, Pupitre, Validator, Camera } from '../types';
import { BusStatus, PupitreStatus, ValidatorStatus, CameraStatus } from '../types';
import api from './api';

export const devicesService = {
  // Buses
  getBuses: async (status?: BusStatus): Promise<Bus[]> => {
    try {
      const response = await api.get(`/buses${status ? `?status=${status}` : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar los buses:', error);
      throw new Error('Error al cargar los buses. Por favor, intente nuevamente.');
    }
  },

  getBusById: async (id: string): Promise<Bus> => {
    try {
      const response = await api.get(`/buses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar el bus ${id}:`, error);
      throw new Error('Error al cargar el bus. Por favor, intente nuevamente.');
    }
  },

  updateBusStatus: async (id: string, status: BusStatus): Promise<Bus> => {
    try {
      const response = await api.put(`/buses/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el estado del bus ${id}:`, error);
      throw new Error('Error al actualizar el estado del bus. Por favor, intente nuevamente.');
    }
  },

  // Pupitres
  getPupitres: async (status?: PupitreStatus): Promise<Pupitre[]> => {
    try {
      const response = await api.get(`/pupitres${status ? `?status=${status}` : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar los pupitres:', error);
      throw new Error('Error al cargar los pupitres. Por favor, intente nuevamente.');
    }
  },

  getPupitreById: async (id: string): Promise<Pupitre> => {
    try {
      const response = await api.get(`/pupitres/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar el pupitre ${id}:`, error);
      throw new Error('Error al cargar el pupitre. Por favor, intente nuevamente.');
    }
  },

  updatePupitreStatus: async (id: string, status: PupitreStatus): Promise<Pupitre> => {
    const response = await api.put(`/pupitres/${id}/status`, { status });
    return response.data;
  },

  // Validadores
  getValidators: async (status?: ValidatorStatus): Promise<Validator[]> => {
    try {
      const response = await api.get(`/validators${status ? `?status=${status}` : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar las validadoras:', error);
      throw new Error('Error al cargar las validadoras. Por favor, intente nuevamente.');
    }
  },

  getValidatorById: async (id: string): Promise<Validator> => {
    try {
      const response = await api.get(`/validators/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar la validadora ${id}:`, error);
      throw new Error('Error al cargar la validadora. Por favor, intente nuevamente.');
    }
  },

  updateValidatorStatus: async (id: string, status: ValidatorStatus): Promise<Validator> => {
    const response = await api.put(`/validators/${id}/status`, { status });
    return response.data;
  },

  // Cámaras
  getCameras: async (status?: CameraStatus): Promise<Camera[]> => {
    try {
      const response = await api.get(`/cameras${status ? `?status=${status}` : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar las cámaras:', error);
      throw new Error('Error al cargar las cámaras. Por favor, intente nuevamente.');
    }
  },

  getCameraById: async (id: string): Promise<Camera> => {
    try {
      const response = await api.get(`/cameras/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar la cámara ${id}:`, error);
      throw new Error('Error al cargar la cámara. Por favor, intente nuevamente.');
    }
  },

  updateCameraStatus: async (id: string, status: CameraStatus): Promise<Camera> => {
    const response = await api.put(`/cameras/${id}/status`, { status });
    return response.data;
  },
}; 