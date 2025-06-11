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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pupitres
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

      {pupitres && pupitres.length > 0 ? (
        <Grid container spacing={3}>
          {pupitres.map((pupitre) => (
            <Grid item xs={12} sm={6} md={3} key={pupitre.id}>
              <PupitreStatus pupitre={pupitre} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="No hay pupitres disponibles"
          message="No se encontraron pupitres con los filtros seleccionados"
        />
      )}
    </Box>
  );
}; 