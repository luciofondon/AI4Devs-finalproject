import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapView } from '../components/MapView/MapView';
import { Box, ToggleButtonGroup, ToggleButton, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import { devicesService } from '../services/devices';
import { BusStatus } from '../types';
import type { Bus } from '../types';

const MapPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<BusStatus | 'ALL'>('ALL');
  const [error, setError] = useState<string | null>(null);

  const { data: buses = [], isLoading, isError } = useQuery<Bus[], Error>({
    queryKey: ['buses', statusFilter],
    queryFn: () => devicesService.getBuses(statusFilter === 'ALL' ? undefined : statusFilter),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">
          Error al cargar los buses. Por favor, intente nuevamente.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Typography variant="h6">Mapa de Autobuses</Typography>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, newValue) => newValue && setStatusFilter(newValue)}
          aria-label="filtro de estado"
          size="small"
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
      <Box sx={{ flex: 1, position: 'relative' }}>
        <MapView buses={buses} />
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MapPage; 