import { Container, Grid, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { devicesService } from '../../services/devices';
import { ValidatorStatus } from '../../components/ValidatorStatus/ValidatorStatus';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useState } from 'react';
import type { Validator } from '../../types';

const ValidatorsPage = () => {
  const [statusFilter, setStatusFilter] = useState<Validator['status'] | 'ALL'>('ALL');

  const { data: validators, isLoading, error } = useQuery<Validator[]>({
    queryKey: ['validators', statusFilter],
    queryFn: () => devicesService.getValidators(statusFilter === 'ALL' ? undefined : statusFilter),
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
        <ToggleButton value="WARNING">WARNING</ToggleButton>
        <ToggleButton value="KO">KO</ToggleButton>
      </ToggleButtonGroup>
      {(!validators || validators.length === 0) ? (
        <EmptyState
          title="No hay validadoras"
          message="No se encontraron validadoras en el sistema"
        />
      ) : (
        <Grid container spacing={3}>
          {validators.map((validator) => (
            <Grid item xs={12} sm={6} md={4} key={validator.id}>
              <ValidatorStatus validator={validator} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ValidatorsPage; 