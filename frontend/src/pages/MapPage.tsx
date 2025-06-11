import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useBuses } from '../hooks/useBuses';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPage: React.FC = () => {
  const { buses, loading, error } = useBuses();

  // Coordenadas centrales de Palma de Mallorca
  const center: [number, number] = [39.569600, 2.650160];

  // Función para determinar el color del marcador según el estado del bus
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'OK':
        return '#4caf50'; // Verde
      case 'WARNING':
        return '#ff9800'; // Naranja
      case 'KO':
        return '#f44336'; // Rojo
      default:
        return '#2196f3'; // Azul
    }
  };

  // Crear un icono personalizado para cada bus
  const createCustomIcon = (status: string) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="
        background-color: ${getMarkerColor(status)};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ 
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buses.map((bus) => (
          bus.latitude && bus.longitude && (
            <Marker
              key={bus.id}
              position={[Number(bus.latitude), Number(bus.longitude)]}
              icon={createCustomIcon(bus.status)}
            >
              <Popup>
                <div style={{ padding: '8px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Bus {bus.id}</h3>
                  <p style={{ margin: '4px 0' }}><strong>Estado:</strong> {bus.status}</p>
                  <p style={{ margin: '4px 0' }}><strong>Pupitres:</strong> {bus.pupitres?.length || 0}</p>
                  <p style={{ margin: '4px 0' }}><strong>Validadores:</strong> {bus.validators?.length || 0}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage; 