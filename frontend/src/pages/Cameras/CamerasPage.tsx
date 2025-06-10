import { Container, Typography, Grid, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { CameraStatus } from '../../components/CameraStatus/CameraStatus';
import { useState } from 'react';
import type { Camera } from '../../types';

export const CamerasPage = () => {
  const [statusFilter, setStatusFilter] = useState<Camera['status'] | 'ALL'>('ALL');

  const { data: cameras, isLoading, error } = useQuery<Camera[]>({
    queryKey: ['cameras', statusFilter],
    queryFn: () => devicesService.getCameras(statusFilter === 'ALL' ? undefined : statusFilter),
  });

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error al cargar las cámaras"
        message={error instanceof Error ? error.message : 'Error desconocido'}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={(_, newValue) => newValue && setStatusFilter(newValue)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="ALL">Todos</ToggleButton>
        <ToggleButton value="OK">OK</ToggleButton>
        <ToggleButton value="KO">KO</ToggleButton>
      </ToggleButtonGroup>
      {(!cameras || cameras.length === 0) ? (
        <EmptyState
          title="No hay cámaras"
          message="No se encontraron cámaras en el sistema"
        />
      ) : (
        <Grid container spacing={3}>
          {cameras.map((camera) => (
            <Grid item xs={12} sm={6} md={4} key={camera.id}>
              <CameraStatus camera={camera} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}; 