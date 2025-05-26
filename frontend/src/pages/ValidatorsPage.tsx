import { Container, Grid, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../services/devices';
import { ValidatorStatus } from '../components/ValidatorStatus/ValidatorStatus';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../components/EmptyState/EmptyState';

export const ValidatorsPage = () => {
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
          <Box
            key={validator.id}
            sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.33% - 16px)',
              },
            }}
          >
            <ValidatorStatus validator={validator} />
          </Box>
        ))}
      </Grid>
    </Container>
  );
}; 