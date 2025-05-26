import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { BusDevices } from '../../components/BusDevices/BusDevices';
import { BusStatus } from '../../components/BusStatus/BusStatus';

export const BusDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bus, isLoading: isLoadingBus, error: busError } = useQuery({
    queryKey: ['bus', id],
    queryFn: () => devicesService.getBusById(id!),
    enabled: !!id,
  });

  const { data: pupitres, isLoading: isLoadingPupitres } = useQuery({
    queryKey: ['pupitres'],
    queryFn: devicesService.getPupitres,
  });

  const { data: validators, isLoading: isLoadingValidators } = useQuery({
    queryKey: ['validators'],
    queryFn: devicesService.getValidators,
  });

  const { data: cameras, isLoading: isLoadingCameras } = useQuery({
    queryKey: ['cameras'],
    queryFn: devicesService.getCameras,
  });

  const isLoading = isLoadingBus || isLoadingPupitres || isLoadingValidators || isLoadingCameras;

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (busError || !bus) {
    return (
      <ErrorMessage
        title="Error al cargar el bus"
        message={busError instanceof Error ? busError.message : 'Bus no encontrado'}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/buses')}
        sx={{ mb: 2 }}
      >
        Volver a buses
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles del Bus {bus.id}
        </Typography>

        <Grid container spacing={3}>
          <Box
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
              p: 1,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Estado del Bus
              </Typography>
              <BusStatus
                bus={bus}
                pupitres={pupitres || []}
                validators={validators || []}
                cameras={cameras || []}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: {
                xs: '100%',
                md: '50%',
              },
              p: 1,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Información del Bus
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>ID:</strong> {bus.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Estado:</strong> {bus.status}
                </Typography>
                <Typography variant="body1">
                  <strong>Última actualización:</strong>{' '}
                  {new Date(bus.updatedAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Fecha de creación:</strong>{' '}
                  {new Date(bus.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              p: 1,
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Dispositivos Asociados
              </Typography>
              <BusDevices
                bus={bus}
                pupitres={pupitres || []}
                validators={validators || []}
                cameras={cameras || []}
              />
            </Box>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
}; 