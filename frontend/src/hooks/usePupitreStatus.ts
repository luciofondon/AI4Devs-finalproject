import { useMutation, useQueryClient } from '@tanstack/react-query';
import { devicesService } from '../services/devices';
import type { PupitreStatus } from '../types';

export const usePupitreStatus = () => {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ pupitreId, status }: { pupitreId: string; status: PupitreStatus }) =>
      devicesService.updatePupitreStatus(pupitreId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pupitres'] });
    },
  });

  return {
    updateStatus: updateStatus.mutate,
    isUpdating: updateStatus.isPending,
    error: updateStatus.error,
    isSuccess: updateStatus.isSuccess,
  };
}; 