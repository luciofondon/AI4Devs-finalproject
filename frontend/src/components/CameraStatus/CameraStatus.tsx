import { Card, CardContent, Typography, Chip, Stack, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Camera, CameraStatus as CameraStatusType } from '../../types';
import { useCameraStatus } from '../../hooks/useCameraStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';

interface CameraStatusProps {
  camera: Camera;
}

const getStatusColor = (status: CameraStatusType) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'KO':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: CameraStatusType) => {
  switch (status) {
    case 'OK':
      return <CheckCircleIcon />;
    case 'KO':
      return <CancelIcon />;
    default:
      return <HelpIcon />;
  }
};

const getStatusBackgroundColor = (status: CameraStatusType) => {
  switch (status) {
    case 'OK':
      return 'rgba(76, 175, 80, 0.1)';
    case 'KO':
      return 'rgba(244, 67, 54, 0.1)';
    default:
      return 'transparent';
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

  const handleBusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/buses/${camera.busId}`);
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

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <DirectionsBusIcon color="primary" />
          <Link
            component="button"
            variant="body2"
            onClick={handleBusClick}
            sx={{ textDecoration: 'none' }}
          >
            Ver Bus {camera.busId}
          </Link>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
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