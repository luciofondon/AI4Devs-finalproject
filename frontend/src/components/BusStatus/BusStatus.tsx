import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Bus, BusStatus as BusStatusType, Pupitre, Validator, Camera } from '../../types';
import { useBusStatus } from '../../hooks/useBusStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { BusDevices } from '../BusDevices/BusDevices';

interface BusStatusProps {
  bus: Bus;
  pupitres: Pupitre[];
  validators: Validator[];
  cameras: Camera[];
}

const getStatusColor = (status: Bus['status']) => {
  switch (status) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'KO':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusBackgroundColor = (status: Bus['status']) => {
  switch (status) {
    case 'OK':
      return 'rgba(76, 175, 80, 0.1)'; // verde claro
    case 'WARNING':
      return 'rgba(255, 152, 0, 0.1)'; // amarillo claro
    case 'KO':
      return 'rgba(244, 67, 54, 0.1)'; // rojo claro
    default:
      return 'transparent';
  }
};

export const BusStatus = ({ bus, pupitres, validators, cameras }: BusStatusProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/buses/${bus.id}`);
  };

  return (
    <Card 
      sx={{ 
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
        backgroundColor: getStatusBackgroundColor(bus.status),
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          Bus {bus.id}
        </Typography>
        <Chip
          label={bus.status}
          color={getStatusColor(bus.status)}
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(bus.updatedAt).toLocaleString()}
        </Typography>
        <BusDevices
          bus={bus}
          pupitres={pupitres}
          validators={validators}
          cameras={cameras}
        />
      </CardContent>
    </Card>
  );
}; 