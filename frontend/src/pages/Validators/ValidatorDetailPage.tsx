import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Chip, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ValidatorStatus } from '../../components/ValidatorStatus/ValidatorStatus';
import type { ReaderStatus } from '../../types';

const getReaderStatusColor = (status: ReaderStatus) => {
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

export const ValidatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: validator, isLoading: isLoadingValidator, error: validatorError } = useQuery({
    queryKey: ['validator', id],
    queryFn: () => devicesService.getValidatorById(id!),
    enabled: !!id,
  });

  const { data: bus, isLoading: isLoadingBus } = useQuery({
    queryKey: ['bus', validator?.busId],
    queryFn: () => devicesService.getBusById(validator!.busId),
    enabled: !!validator?.busId,
  });

  const isLoading = isLoadingValidator || isLoadingBus;

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (validatorError || !validator) {
    return (
      <ErrorMessage
        title="Error al cargar la validadora"
        message={validatorError instanceof Error ? validatorError.message : 'Validadora no encontrada'}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/validators')}
        sx={{ mb: 2 }}
      >
        Volver a validadoras
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles de la Validadora {validator.id}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Estado de la Validadora
            </Typography>
            <ValidatorStatus validator={validator} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Información de la Validadora
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>ID:</strong> {validator.id}
              </Typography>
              <Typography variant="body1">
                <strong>Estado:</strong> {validator.status}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Estado de los Lectores:</strong>
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={`RFID: ${validator.rfidStatus}`}
                  color={getReaderStatusColor(validator.rfidStatus)}
                  size="small"
                />
                <Chip
                  label={`EMV: ${validator.emvStatus}`}
                  color={getReaderStatusColor(validator.emvStatus)}
                  size="small"
                />
              </Stack>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Bus asociado:</strong>{' '}
                {bus ? `Bus ${bus.id}` : 'No hay bus asociado'}
              </Typography>
              <Typography variant="body1">
                <strong>Última actualización:</strong>{' '}
                {new Date(validator.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de creación:</strong>{' '}
                {new Date(validator.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 