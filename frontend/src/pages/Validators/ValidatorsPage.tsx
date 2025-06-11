import { Grid, Typography, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Validadoras
        </Typography>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, newValue) => newValue && setStatusFilter(newValue)}
          aria-label="filtro de estado"
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

      {validators && validators.length > 0 ? (
        <Grid container spacing={3}>
          {validators.map((validator) => (
            <Grid item xs={12} sm={6} md={3} key={validator.id}>
              <ValidatorStatus validator={validator} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="No hay validadoras"
          message="No se encontraron validadoras con los filtros seleccionados"
        />
      )}
    </Box>
  );
};

export default ValidatorsPage; 