import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PupitreStatus } from '../../components/PupitreStatus/PupitreStatus';

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

  const isLoading = isLoadingPupitre || isLoadingBus;

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (pupitreError || !pupitre) {
    return (
      <ErrorMessage
        title="Error al cargar el pupitre"
        message={pupitreError instanceof Error ? pupitreError.message : 'Pupitre no encontrado'}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/pupitres')}
        sx={{ mb: 2 }}
      >
        Volver a pupitres
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles del Pupitre {pupitre.id}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Estado del Pupitre
            </Typography>
            <PupitreStatus pupitre={pupitre} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Información del Pupitre
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>ID:</strong> {pupitre.id}
              </Typography>
              <Typography variant="body1">
                <strong>Estado:</strong> {pupitre.status}
              </Typography>
              <Typography variant="body1">
                <strong>Bus asociado:</strong>{' '}
                {bus ? `Bus ${bus.id}` : 'No hay bus asociado'}
              </Typography>
              <Typography variant="body1">
                <strong>Última actualización:</strong>{' '}
                {new Date(pupitre.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de creación:</strong>{' '}
                {new Date(pupitre.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 