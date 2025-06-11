import React from 'react';
import { useBuses } from '../hooks/useBuses';
import { MapView } from '../components/MapView/MapView';

const MapPage: React.FC = () => {
  const { buses, loading, error } = useBuses();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <MapView buses={buses} />
    </div>
  );
};

export default MapPage; 