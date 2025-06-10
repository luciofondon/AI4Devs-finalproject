import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TvIcon from '@mui/icons-material/Tv';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VideocamIcon from '@mui/icons-material/Videocam';
import type { Bus, Pupitre, Validator, Camera } from '../../types';

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
      return 'rgba(76, 175, 80, 0.1)';
    case 'WARNING':
      return 'rgba(255, 152, 0, 0.1)';
    case 'KO':
      return 'rgba(244, 67, 54, 0.1)';
    default:
      return 'transparent';
  }
};

export const BusStatus = ({ bus, pupitres, validators, cameras }: BusStatusProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/buses/${bus.id}`);
  };

  // Filtrar dispositivos asociados a este bus
  const busPupitres = pupitres.filter(p => p.busId === bus.id);
  const busValidators = validators.filter(v => v.busId === bus.id);
  const busCameras = cameras.filter(c => c.busId === bus.id);

  return (
    <Card 
      sx={{ 
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: { xs: '320px', sm: '350px' },
        '&:hover': {
          boxShadow: 6,
        },
        backgroundColor: getStatusBackgroundColor(bus.status),
        border: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" component="div" fontWeight={700}>
            Bus {bus.id}
          </Typography>
          <Chip
            label={bus.status}
            color={getStatusColor(bus.status)}
            size="medium"
            sx={{ fontSize: 18, fontWeight: 700, px: 2, py: 1, height: 36, textTransform: 'uppercase', boxShadow: 2 }}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TvIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={600}>{busPupitres.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CreditCardIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={600}>{busValidators.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VideocamIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={600}>{busCameras.length}</Typography>
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(bus.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}; 