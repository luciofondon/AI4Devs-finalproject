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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Autobuses
        </Typography>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, newValue) => newValue && setStatusFilter(newValue)}
          aria-label="filtro de estado"
          size="small"
        >
          <ToggleButton value="ALL" aria-label="todos">
            Todos
          </ToggleButton>
          <ToggleButton value="OK" aria-label="ok">
            OK
          </ToggleButton>
          <ToggleButton value="WARNING" aria-label="warning">
            Warning
          </ToggleButton>
          <ToggleButton value="KO" aria-label="ko">
            KO
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {buses && buses.length > 0 ? (
        <Grid container spacing={3}>
          {buses.map((bus) => {
            const busPupitres = pupitres?.filter(p => p.busId === bus.id) || [];
            const busValidators = validators?.filter(v => v.busId === bus.id) || [];
            const busCameras = cameras?.filter(c => c.busId === bus.id) || [];

            return (
              <Grid item xs={12} sm={6} md={3} key={bus.id}>
                <BusStatus
                  bus={bus}
                  pupitres={busPupitres}
                  validators={busValidators}
                  cameras={busCameras}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <EmptyState
          title="No hay autobuses"
          message="No se encontraron autobuses con los filtros seleccionados"
        />
      )}
    </Box>
  );
}; 