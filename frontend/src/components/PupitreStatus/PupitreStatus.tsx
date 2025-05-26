import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Pupitre, PupitreStatus as PupitreStatusType } from '../../types';
import { usePupitreStatus } from '../../hooks/usePupitreStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

interface PupitreStatusProps {
  pupitre: Pupitre;
}

const getStatusColor = (status: Pupitre['status']) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'KO':
      return 'error';
    default:
      return 'default';
  }
};

export const PupitreStatus = ({ pupitre }: PupitreStatusProps) => {
  const navigate = useNavigate();
  const { updateStatus, isUpdating, error, isSuccess } = usePupitreStatus();

  const handleStatusChange = (newStatus: PupitreStatusType) => {
    updateStatus({ pupitreId: pupitre.id, status: newStatus });
  };

  const handleClick = () => {
    navigate(`/pupitres/${pupitre.id}`);
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
          Pupitre {pupitre.id}
        </Typography>
        <Chip
          label={pupitre.status}
          color={getStatusColor(pupitre.status)}
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Bus ID: {pupitre.busId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Última actualización: {new Date(pupitre.updatedAt).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('OK' as PupitreStatusType);
            }}
            disabled={isUpdating || pupitre.status === 'OK'}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('WARNING' as PupitreStatusType);
            }}
            disabled={isUpdating || pupitre.status === 'WARNING'}
          >
            WARNING
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('KO' as PupitreStatusType);
            }}
            disabled={isUpdating || pupitre.status === 'KO'}
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
            message="El estado del pupitre se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 