import { Grid, Typography, CircularProgress, Alert, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PupitreStatus } from '../../components/PupitreStatus/PupitreStatus';
import { devicesService } from '../../services/devices';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useState } from 'react';
import type { Pupitre } from '../../types';

export const PupitresPage = () => {
  const [statusFilter, setStatusFilter] = useState<Pupitre['status'] | 'ALL'>('ALL');

  const { data: pupitres, isLoading, error } = useQuery<Pupitre[]>({
    queryKey: ['pupitres', statusFilter],
    queryFn: () => devicesService.getPupitres(statusFilter === 'ALL' ? undefined : statusFilter),
  });

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error al cargar los pupitres: {error instanceof Error ? error.message : 'Error desconocido'}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
  
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
      {(!pupitres || pupitres.length === 0) ? (
        <EmptyState
          title="No hay pupitres disponibles"
          message="No se encontraron pupitres en el sistema. Por favor, intente más tarde."
        />
      ) : (
        <Grid container spacing={2}>
          {pupitres.map((pupitre) => (
            <Box key={pupitre.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
              <PupitreStatus pupitre={pupitre} />
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}; 