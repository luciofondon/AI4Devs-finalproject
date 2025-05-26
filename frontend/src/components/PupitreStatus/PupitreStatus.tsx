import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
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
  const { updateStatus, isUpdating, error, isSuccess } = usePupitreStatus();

  const handleStatusChange = (newStatus: PupitreStatusType) => {
    updateStatus({ pupitreId: pupitre.id, status: newStatus });
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <LoadingOverlay open={isUpdating} />
      <CardContent>
        <Typography variant="h6" component="div">
          Pupitre {pupitre.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bus: {pupitre.busId}
        </Typography>
        <Chip
          label={pupitre.status}
          color={getStatusColor(pupitre.status)}
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(pupitre.updatedAt).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => handleStatusChange('OK' as PupitreStatusType)}
            disabled={isUpdating || pupitre.status === 'OK'}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => handleStatusChange('WARNING' as PupitreStatusType)}
            disabled={isUpdating || pupitre.status === 'WARNING'}
          >
            WARNING
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleStatusChange('KO' as PupitreStatusType)}
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