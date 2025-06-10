import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { CameraStatus } from '../../components/CameraStatus/CameraStatus';

export const CameraDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: camera, isLoading: isLoadingCamera, error: cameraError } = useQuery({
    queryKey: ['camera', id],
    queryFn: () => devicesService.getCameraById(id!),
    enabled: !!id,
  });

  const { data: bus, isLoading: isLoadingBus } = useQuery({
    queryKey: ['bus', camera?.busId],
    queryFn: () => devicesService.getBusById(camera!.busId),
    enabled: !!camera?.busId,
  });

  const isLoading = isLoadingCamera || isLoadingBus;

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (cameraError || !camera) {
    return (
      <ErrorMessage
        title="Error al cargar la cámara"
        message={cameraError instanceof Error ? cameraError.message : 'Cámara no encontrada'}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/cameras')}
        sx={{ mb: 2 }}
      >
        Volver a cámaras
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles de la Cámara {camera.id}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Estado de la Cámara
            </Typography>
            <CameraStatus camera={camera} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Información de la Cámara
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>ID:</strong> {camera.id}
              </Typography>
              <Typography variant="body1">
                <strong>Estado:</strong> {camera.status}
              </Typography>
              <Typography variant="body1">
                <strong>Conexión:</strong> {camera.connection}
              </Typography>
              <Typography variant="body1">
                <strong>Calidad:</strong> {camera.quality}
              </Typography>
              <Typography variant="body1">
                <strong>Bus asociado:</strong>{' '}
                {bus ? `Bus ${bus.id}` : 'No hay bus asociado'}
              </Typography>
              <Typography variant="body1">
                <strong>Última actualización:</strong>{' '}
                {new Date(camera.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de creación:</strong>{' '}
                {new Date(camera.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 