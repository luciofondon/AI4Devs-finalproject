import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ValidatorStatus } from '../types';
import { devicesService } from '../services/devices';

interface UpdateValidatorStatusParams {
  validatorId: string;
  status: ValidatorStatus;
}

export const useValidatorStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  const updateStatus = async ({ validatorId, status }: UpdateValidatorStatusParams) => {
    try {
      setIsUpdating(true);
      setError(null);
      setIsSuccess(false);

      await devicesService.updateValidatorStatus(validatorId, status);

      // Invalidar la caché de validadores para forzar una nueva petición
      await queryClient.invalidateQueries({ queryKey: ['validators'] });

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar el estado'));
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStatus,
    isUpdating,
    error,
    isSuccess,
  };
}; 