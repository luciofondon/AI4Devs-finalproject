import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import type { Validator, ValidatorStatus as ValidatorStatusType } from '../../types';
import { useValidatorStatus } from '../../hooks/useValidatorStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

interface ValidatorStatusProps {
  validator: Validator;
}

const getStatusColor = (status: Validator['status']) => {
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

export const ValidatorStatus = ({ validator }: ValidatorStatusProps) => {
  const { updateStatus, isUpdating, error, isSuccess } = useValidatorStatus();

  const handleStatusChange = (newStatus: ValidatorStatusType) => {
    updateStatus({ validatorId: validator.id, status: newStatus });
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <LoadingOverlay open={isUpdating} />
      <CardContent>
        <Typography variant="h6" component="div">
          Validadora {validator.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bus: {validator.busId}
        </Typography>
        <Chip
          label={validator.status}
          color={getStatusColor(validator.status)}
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(validator.updatedAt).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => handleStatusChange('OK' as ValidatorStatusType)}
            disabled={isUpdating || validator.status === 'OK'}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => handleStatusChange('WARNING' as ValidatorStatusType)}
            disabled={isUpdating || validator.status === 'WARNING'}
          >
            WARNING
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleStatusChange('KO' as ValidatorStatusType)}
            disabled={isUpdating || validator.status === 'KO'}
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
            message="El estado de la validadora se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 