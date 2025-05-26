import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import type { Bus, BusStatus as BusStatusType, Pupitre, Validator, Camera } from '../../types';
import { useBusStatus } from '../../hooks/useBusStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { BusDevices } from '../BusDevices/BusDevices';

interface BusStatusProps {
  bus: Bus;
  pupitres: Pupitre[];
  validators: Validator[];
  cameras: Camera[];
}

const getStatusColor = (status: Bus['status']) => {
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

export const BusStatus = ({ bus, pupitres, validators, cameras }: BusStatusProps) => {
  const { updateStatus, isUpdating, error, isSuccess } = useBusStatus();

  const handleStatusChange = (newStatus: BusStatusType) => {
    updateStatus({ busId: bus.id, status: newStatus });
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <LoadingOverlay open={isUpdating} />
      <CardContent>
        <Typography variant="h6" component="div">
          Bus {bus.id}
        </Typography>
        <Chip
          label={bus.status}
          color={getStatusColor(bus.status)}
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(bus.updatedAt).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => handleStatusChange('OK' as BusStatusType)}
            disabled={isUpdating || bus.status === 'OK'}
          >
            OK
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => handleStatusChange('WARNING' as BusStatusType)}
            disabled={isUpdating || bus.status === 'WARNING'}
          >
            WARNING
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleStatusChange('KO' as BusStatusType)}
            disabled={isUpdating || bus.status === 'KO'}
          >
            KO
          </Button>
        </Stack>
        <BusDevices
          bus={bus}
          pupitres={pupitres}
          validators={validators}
          cameras={cameras}
        />
        {error && (
          <ErrorMessage
            title="Error al actualizar el estado"
            message={error instanceof Error ? error.message : 'Error desconocido'}
          />
        )}
        {isSuccess && (
          <SuccessMessage
            title="Estado actualizado"
            message="El estado del bus se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 