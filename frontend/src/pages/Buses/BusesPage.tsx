import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { BusStatus } from '../../components/BusStatus/BusStatus';
import { devicesService } from '../../services/devices';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export const BusesPage = () => {
  const { data: buses, isLoading: isLoadingBuses, error: busesError } = useQuery({
    queryKey: ['buses'],
    queryFn: devicesService.getBuses,
  });

  const { data: pupitres, isLoading: isLoadingPupitres, error: pupitresError } = useQuery({
    queryKey: ['pupitres'],
    queryFn: devicesService.getPupitres,
  });

  const { data: validators, isLoading: isLoadingValidators, error: validatorsError } = useQuery({
    queryKey: ['validators'],
    queryFn: devicesService.getValidators,
  });

  const { data: cameras, isLoading: isLoadingCameras, error: camerasError } = useQuery({
    queryKey: ['cameras'],
    queryFn: devicesService.getCameras,
  });

  const isLoading = isLoadingBuses || isLoadingPupitres || isLoadingValidators || isLoadingCameras;
  const error = busesError || pupitresError || validatorsError || camerasError;

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error al cargar los datos: {error instanceof Error ? error.message : 'Error desconocido'}
      </Alert>
    );
  }

  if (!buses || buses.length === 0) {
    return (
      <EmptyState
        title="No hay buses disponibles"
        message="No se encontraron buses en el sistema. Por favor, intente más tarde."
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Buses
      </Typography>
      <Grid container spacing={2}>
        {buses.map((bus) => (
          <Box key={bus.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
            <BusStatus
              bus={bus}
              pupitres={pupitres || []}
              validators={validators || []}
              cameras={cameras || []}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}; 