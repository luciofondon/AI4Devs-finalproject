import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Chip, Stack, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import type { ReaderStatus, PrinterStatus, ModemStatus, GPSStatus } from '../../types';

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

export const PupitreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pupitre, isLoading: isLoadingPupitre, error: pupitreError } = useQuery({
    queryKey: ['pupitre', id],
    queryFn: () => devicesService.getPupitreById(id!),
    enabled: !!id,
  });

  const { data: bus, isLoading: isLoadingBus } = useQuery({
    queryKey: ['bus', pupitre?.busId],
    queryFn: () => devicesService.getBusById(pupitre!.busId),
    enabled: !!pupitre?.busId,
  });

  if (isLoadingPupitre || isLoadingBus) {
    return <LoadingOverlay open={true} />;
  }

  if (pupitreError || !pupitre) {
    return (
      <ErrorMessage
        title="Error al cargar el pupitre"
        message={pupitreError instanceof Error ? pupitreError.message : 'Error desconocido'}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Pupitre {pupitre.id}
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/pupitres')}>
            Volver
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Estado General
          </Typography>
          <Chip
            label={pupitre.status}
            color={pupitre.status === 'OK' ? 'success' : pupitre.status === 'WARNING' ? 'warning' : 'error'}
            sx={{ mb: 2 }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Estado de los Lectores
          </Typography>
          <Stack direction="row" spacing={2}>
            <Chip
              label={`QR: ${pupitre.qrStatus}`}
              color={getReaderStatusColor(pupitre.qrStatus)}
            />
            <Chip
              label={`RFID: ${pupitre.rfidStatus}`}
              color={getReaderStatusColor(pupitre.rfidStatus)}
            />
            <Chip
              label={`EMV: ${pupitre.emvStatus}`}
              color={getReaderStatusColor(pupitre.emvStatus)}
            />
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Estado de la Impresora
          </Typography>
          <Chip
            label={pupitre.printerStatus}
            color={getPrinterStatusColor(pupitre.printerStatus)}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Estado de la Comunicación
          </Typography>
          <Stack direction="row" spacing={2}>
            <Chip
              label={`Módem: ${pupitre.modemStatus}`}
              color={getModemStatusColor(pupitre.modemStatus)}
            />
            <Chip
              label={`GPS: ${pupitre.gpsStatus}`}
              color={getGPSStatusColor(pupitre.gpsStatus)}
            />
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Información del Bus
          </Typography>
          {bus ? (
            <Box>
              <Typography variant="body1">
                Bus ID: {bus.id}
              </Typography>
              <Typography variant="body1">
                Estado del Bus: {bus.status}
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate(`/buses/${bus.id}`)}
                sx={{ mt: 1 }}
              >
                Ver detalles del bus
              </Button>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No hay información del bus disponible
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Información del Sistema
          </Typography>
          <Typography variant="body1">
            Última actualización: {new Date(pupitre.updatedAt).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            Fecha de creación: {new Date(pupitre.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}; 