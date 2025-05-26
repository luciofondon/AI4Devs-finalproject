import { Container, Typography, Grid, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { CameraStatus } from '../../components/CameraStatus/CameraStatus';

export const CamerasPage = () => {
  const { data: cameras, isLoading, error } = useQuery({
    queryKey: ['cameras'],
    queryFn: devicesService.getCameras,
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

  if (!cameras || cameras.length === 0) {
    return (
      <EmptyState
        title="No hay cámaras"
        message="No se encontraron cámaras en el sistema"
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cámaras
      </Typography>

      <Grid container spacing={3}>
        {cameras.map((camera) => (
          <Grid item xs={12} sm={6} md={4} key={camera.id}>
            <CameraStatus camera={camera} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 