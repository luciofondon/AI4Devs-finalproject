import type { Bus, Pupitre, Validator, Camera } from '../types';
import { BusStatus, PupitreStatus, ValidatorStatus, CameraStatus } from '../types';

const API_URL = 'http://localhost:3000/api/v1';

export const devicesService = {
  // Buses
  getBuses: async (status?: BusStatus): Promise<Bus[]> => {
    const url = status ? `${API_URL}/buses?status=${status}` : `${API_URL}/buses`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar los buses');
    }
    return response.json();
  },

  getBusById: async (id: string): Promise<Bus> => {
    const response = await fetch(`${API_URL}/buses/${id}`);
    if (!response.ok) {
      throw new Error('Error al cargar el bus');
    }
    return response.json();
  },

  updateBusStatus: async (id: string, status: BusStatus): Promise<Bus> => {
    const response = await fetch(`${API_URL}/buses/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del bus');
    }
    return response.json();
  },

  // Pupitres
  getPupitres: async (status?: PupitreStatus): Promise<Pupitre[]> => {
    const url = status ? `${API_URL}/pupitres?status=${status}` : `${API_URL}/pupitres`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar los pupitres');
    }
    return response.json();
  },

  getPupitreById: async (id: string): Promise<Pupitre> => {
    const response = await fetch(`${API_URL}/pupitres/${id}`);
    if (!response.ok) {
      throw new Error('Error al cargar el pupitre');
    }
    return response.json();
  },

  updatePupitreStatus: async (id: string, status: PupitreStatus): Promise<Pupitre> => {
    const response = await fetch(`${API_URL}/pupitres/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del pupitre');
    }
    return response.json();
  },

  // Validadores
  getValidators: async (status?: ValidatorStatus): Promise<Validator[]> => {
    const url = status ? `${API_URL}/validators?status=${status}` : `${API_URL}/validators`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar los validadores');
    }
    return response.json();
  },

  getValidatorById: async (id: string): Promise<Validator> => {
    const response = await fetch(`${API_URL}/validators/${id}`);
    if (!response.ok) {
      throw new Error('Error al cargar el validador');
    }
    return response.json();
  },

  updateValidatorStatus: async (id: string, status: ValidatorStatus): Promise<Validator> => {
    const response = await fetch(`${API_URL}/validators/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del validador');
    }
    return response.json();
  },

  // Cámaras
  getCameras: async (status?: CameraStatus): Promise<Camera[]> => {
    const url = status ? `${API_URL}/cameras?status=${status}` : `${API_URL}/cameras`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar las cámaras');
    }
    return response.json();
  },

  getCameraById: async (id: string): Promise<Camera> => {
    const response = await fetch(`${API_URL}/cameras/${id}`);
    if (!response.ok) {
      throw new Error('Error al cargar la cámara');
    }
    return response.json();
  },

  updateCameraStatus: async (id: string, status: CameraStatus): Promise<Camera> => {
    const response = await fetch(`${API_URL}/cameras/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado de la cámara');
    }
    return response.json();
  },
}; 