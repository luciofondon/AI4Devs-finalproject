import { Grid, Typography, CircularProgress, Alert, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { BusStatus } from '../../components/BusStatus/BusStatus';
import { devicesService } from '../../services/devices';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useState } from 'react';
import type { Bus, Pupitre, Validator, Camera } from '../../types';

export const BusesPage = () => {
  const [statusFilter, setStatusFilter] = useState<Bus['status'] | 'ALL'>('ALL');

  const { data: buses, isLoading: isLoadingBuses, error: busesError } = useQuery<Bus[]>({
    queryKey: ['buses', statusFilter],
    queryFn: () => devicesService.getBuses(statusFilter === 'ALL' ? undefined : statusFilter),
  });

  const { data: pupitres, isLoading: isLoadingPupitres, error: pupitresError } = useQuery<Pupitre[]>({
    queryKey: ['pupitres'],
    queryFn: () => devicesService.getPupitres(),
  });

  const { data: validators, isLoading: isLoadingValidators, error: validatorsError } = useQuery<Validator[]>({
    queryKey: ['validators'],
    queryFn: () => devicesService.getValidators(),
  });

  const { data: cameras, isLoading: isLoadingCameras, error: camerasError } = useQuery<Camera[]>({
    queryKey: ['cameras'],
    queryFn: () => devicesService.getCameras(),
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

  return (
    <Box sx={{ p: 2 }}>

      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={(_, newValue) => newValue && setStatusFilter(newValue)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="ALL">Todos</ToggleButton>
        <ToggleButton value="OK">OK</ToggleButton>
        <ToggleButton value="WARNING">WARNING</ToggleButton>
        <ToggleButton value="KO">KO</ToggleButton>
      </ToggleButtonGroup>
      {(!buses || buses.length === 0) ? (
        <EmptyState
          title="No hay buses disponibles"
          message="No se encontraron buses en el sistema. Por favor, intente más tarde."
        />
      ) : (
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
      )}
    </Box>
  );
}; 