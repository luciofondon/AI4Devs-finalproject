import { useMutation, useQueryClient } from '@tanstack/react-query';
import { devicesService } from '../services/devices';
import type { BusStatus } from '../types';

export const useBusStatus = () => {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ busId, status }: { busId: string; status: BusStatus }) =>
      devicesService.updateBusStatus(busId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] });
    },
  });

  return {
    updateStatus: updateStatus.mutate,
    isUpdating: updateStatus.isPending,
    error: updateStatus.error,
    isSuccess: updateStatus.isSuccess,
  };
}; 