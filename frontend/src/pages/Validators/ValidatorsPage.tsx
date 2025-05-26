import { Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { ValidatorStatus } from '../../components/ValidatorStatus/ValidatorStatus';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';

const ValidatorsPage = () => {
  const { data: validators, isLoading, error } = useQuery({
    queryKey: ['validators'],
    queryFn: devicesService.getValidators,
  });

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error al cargar las validadoras"
        message={error instanceof Error ? error.message : 'Error desconocido'}
      />
    );
  }

  if (!validators || validators.length === 0) {
    return (
      <EmptyState
        title="No hay validadoras"
        message="No se encontraron validadoras en el sistema"
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Validadoras
      </Typography>
      <Grid container spacing={3}>
        {validators.map((validator) => (
          <Grid item xs={12} sm={6} md={4} key={validator.id}>
            <ValidatorStatus validator={validator} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ValidatorsPage; 