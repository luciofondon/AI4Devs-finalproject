import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Camera, CameraStatus as CameraStatusType } from '../../types';
import { useCameraStatus } from '../../hooks/useCameraStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

interface CameraStatusProps {
  camera: Camera;
}

const getStatusColor = (status: Camera['status']) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'KO':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusBackgroundColor = (status: Camera['status']) => {
  switch (status) {
    case 'OK':
      return 'rgba(76, 175, 80, 0.1)'; // verde claro
    case 'KO':
      return 'rgba(244, 67, 54, 0.1)'; // rojo claro
    default:
      return 'transparent';
  }
};

const getStatusIcon = (status: Camera['status']) => {
  switch (status) {
    case 'OK':
      return null;
    case 'KO':
      return null;
    default:
      return null;
  }
};

export const CameraStatus = ({ camera }: CameraStatusProps) => {
  const navigate = useNavigate();
  const { updateStatus, isUpdating, error, isSuccess } = useCameraStatus();

  const handleStatusChange = (newStatus: CameraStatusType) => {
    updateStatus({ cameraId: camera.id, status: newStatus });
  };

  const handleClick = () => {
    navigate(`/cameras/${camera.id}`);
  };

  return (
    <Card 
      sx={{ 
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
        backgroundColor: getStatusBackgroundColor(camera.status),
      }}
      onClick={handleClick}
    >
      <LoadingOverlay open={isUpdating} />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
          <Chip
            label={camera.status}
            color={getStatusColor(camera.status)}
            size="small"
            icon={getStatusIcon(camera.status)}
            sx={{ 
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Estado de la Cámara:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Bus ID: {camera.busId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Última actualización: {new Date(camera.updatedAt).toLocaleString()}
        </Typography>
        {error && (
          <ErrorMessage
            title="Error al actualizar el estado"
            message={error instanceof Error ? error.message : 'Error desconocido'}
          />
        )}
        {isSuccess && (
          <SuccessMessage
            title="Estado actualizado"
            message="El estado de la cámara se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 