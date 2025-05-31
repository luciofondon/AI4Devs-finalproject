import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Chip, Stack, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { BusDevices } from '../../components/BusDevices/BusDevices';
import type { BusStatus } from '../../types';

const getStatusColor = (status: BusStatus) => {
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

export const BusDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bus, isLoading: isLoadingBus, error: busError } = useQuery({
    queryKey: ['bus', id],
    queryFn: () => devicesService.getBusById(id!),
    enabled: !!id,
  });

  const { data: pupitres = [], isLoading: isLoadingPupitres } = useQuery({
    queryKey: ['pupitres'],
    queryFn: () => devicesService.getPupitres(),
    enabled: !!bus,
  });

  const { data: validators = [], isLoading: isLoadingValidators } = useQuery({
    queryKey: ['validators'],
    queryFn: () => devicesService.getValidators(),
    enabled: !!bus,
  });

  const { data: cameras = [], isLoading: isLoadingCameras } = useQuery({
    queryKey: ['cameras'],
    queryFn: () => devicesService.getCameras(),
    enabled: !!bus,
  });

  if (isLoadingBus || isLoadingPupitres || isLoadingValidators || isLoadingCameras) {
    return <LoadingOverlay open={true} />;
  }

  if (busError || !bus) {
    return (
      <ErrorMessage
        title="Error al cargar el bus"
        message={busError instanceof Error ? busError.message : 'Error desconocido'}
      />
    );
  }

  const busPupitres = pupitres.filter((pupitre) => pupitre.busId === bus.id);
  const busValidators = validators.filter((validator) => validator.busId === bus.id);
  const busCameras = cameras.filter((camera) => camera.busId === bus.id);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Bus {bus.id}
            </Typography>
            <Chip
              label={bus.status}
              color={getStatusColor(bus.status)}
              size="small"
            />
          </Box>
          <Button variant="outlined" onClick={() => navigate('/buses')}>
            Volver
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: '33%' } }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Información del Sistema
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  ID: {bus.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Última actualización: {new Date(bus.updatedAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de creación: {new Date(bus.createdAt).toLocaleString()}
                </Typography>
              </Stack>
            </Paper>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '67%' } }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resumen de Dispositivos
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip
                  label={`${busPupitres.length} Pupitres`}
                  color={busPupitres.length > 0 ? 'primary' : 'default'}
                />
                <Chip
                  label={`${busValidators.length} Validadoras`}
                  color={busValidators.length > 0 ? 'primary' : 'default'}
                />
                <Chip
                  label={`${busCameras.length} Cámaras`}
                  color={busCameras.length > 0 ? 'primary' : 'default'}
                />
              </Stack>
            </Paper>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Divider sx={{ my: 2 }} />
          <BusDevices
            busId={bus.id}
            pupitres={pupitres}
            validators={validators}
            cameras={cameras}
            isDetailView
          />
        </Box>
      </Paper>
    </Container>
  );
}; 