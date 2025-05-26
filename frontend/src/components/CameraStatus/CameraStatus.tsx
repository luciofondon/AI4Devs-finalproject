import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Camera, CameraStatus as CameraStatusType, ConnectionStatus, QualityStatus } from '../../types';
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

const getConnectionColor = (status: ConnectionStatus) => {
  switch (status) {
    case 'CONNECTED':
      return 'success';
    case 'DISCONNECTED':
      return 'error';
    default:
      return 'default';
  }
};

const getQualityColor = (status: QualityStatus) => {
  switch (status) {
    case 'GOOD':
      return 'success';
    case 'MEDIUM':
      return 'warning';
    case 'POOR':
      return 'error';
    default:
      return 'default';
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
      }}
      onClick={handleClick}
    >
      <LoadingOverlay open={isUpdating} />
      <CardContent>
        <Typography variant="h6" component="div">
          Cámara {camera.id}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            label={camera.status}
            color={getStatusColor(camera.status)}
            size="small"
          />
          <Chip
            label={camera.connection}
            color={getConnectionColor(camera.connection)}
            size="small"
          />
          <Chip
            label={camera.quality}
            color={getQualityColor(camera.quality)}
            size="small"
          />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Bus ID: {camera.busId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Última actualización: {new Date(camera.updatedAt).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('OK' as CameraStatusType);
            }}
            disabled={isUpdating || camera.status === 'OK'}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('KO' as CameraStatusType);
            }}
            disabled={isUpdating || camera.status === 'KO'}
          >
            KO
          </Button>
        </Stack>
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