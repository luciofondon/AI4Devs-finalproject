import { Card, CardContent, Typography, Chip, Button, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Pupitre, PupitreStatus as PupitreStatusType, ReaderStatus, PrinterStatus, ModemStatus, GPSStatus } from '../../types';
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

const getStatusBackgroundColor = (status: Pupitre['status']) => {
  switch (status) {
    case 'OK':
      return 'rgba(76, 175, 80, 0.1)'; // verde claro
    case 'WARNING':
      return 'rgba(255, 152, 0, 0.1)'; // amarillo claro
    case 'KO':
      return 'rgba(244, 67, 54, 0.1)'; // rojo claro
    default:
      return 'transparent';
  }
};

const getReaderStatusColor = (status: ReaderStatus) => {
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

const getPrinterStatusColor = (status: PrinterStatus) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'KO':
      return 'error';
    case 'NO_PAPER':
    case 'NO_RIBBON':
      return 'warning';
    default:
      return 'default';
  }
};

const getModemStatusColor = (status: ModemStatus) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'KO':
      return 'error';
    case 'NO_SIGNAL':
      return 'error';
    default:
      return 'default';
  }
};

const getGPSStatusColor = (status: GPSStatus) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'KO':
      return 'error';
    case 'NO_SIGNAL':
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
        backgroundColor: getStatusBackgroundColor(pupitre.status),
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

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Estado de los Lectores:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`QR: ${pupitre.qrStatus}`}
            color={getReaderStatusColor(pupitre.qrStatus)}
            size="small"
          />
          <Chip
            label={`RFID: ${pupitre.rfidStatus}`}
            color={getReaderStatusColor(pupitre.rfidStatus)}
            size="small"
          />
          <Chip
            label={`EMV: ${pupitre.emvStatus}`}
            color={getReaderStatusColor(pupitre.emvStatus)}
            size="small"
          />
        </Stack>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Estado de la Impresora:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={pupitre.printerStatus}
            color={getPrinterStatusColor(pupitre.printerStatus)}
            size="small"
          />
        </Stack>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Estado de la Comunicación:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`Módem: ${pupitre.modemStatus}`}
            color={getModemStatusColor(pupitre.modemStatus)}
            size="small"
          />
          <Chip
            label={`GPS: ${pupitre.gpsStatus}`}
            color={getGPSStatusColor(pupitre.gpsStatus)}
            size="small"
          />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Bus ID: {pupitre.busId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Última actualización: {new Date(pupitre.updatedAt).toLocaleString()}
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
            message="El estado del pupitre se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 