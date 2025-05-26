import { useMutation, useQueryClient } from '@tanstack/react-query';
import { devicesService } from '../services/devices';
import type { CameraStatus } from '../types';

export const useCameraStatus = () => {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ cameraId, status }: { cameraId: string; status: CameraStatus }) =>
      devicesService.updateCameraStatus(cameraId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });

  return {
    updateStatus: updateStatus.mutate,
    isUpdating: updateStatus.isPending,
    error: updateStatus.error,
    isSuccess: updateStatus.isSuccess,
  };
}; 