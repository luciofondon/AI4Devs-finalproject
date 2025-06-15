import React, { useState } from 'react';
import { useBuses } from '../hooks/useBuses';
import { MapView } from '../components/MapView/MapView';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import type { Bus } from '../types';

const MapPage: React.FC = () => {
  const { buses, loading, error } = useBuses();
  const [statusFilter, setStatusFilter] = useState<Bus['status'] | 'ALL'>('ALL');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredBuses = statusFilter === 'ALL' 
    ? buses 
    : buses.filter(bus => bus.status === statusFilter);

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
        <MapView buses={filteredBuses} />
      </Box>
    </Box>
  );
};

export default MapPage; 