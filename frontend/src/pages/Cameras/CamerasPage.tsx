import { Grid, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cámaras
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
          <ToggleButton value="KO" aria-label="ko">
            KO
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {cameras && cameras.length > 0 ? (
        <Grid container spacing={3}>
          {cameras.map((camera) => (
            <Grid item xs={12} sm={6} md={3} key={camera.id}>
              <CameraStatus camera={camera} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="No hay cámaras"
          message="No se encontraron cámaras con los filtros seleccionados"
        />
      )}
    </Box>
  );
}; 