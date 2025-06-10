import { Box, Typography, Stack, Button, Chip, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Pupitre, Validator, Camera } from '../../types';

interface BusDevicesProps {
  busId: string;
  pupitres: Pupitre[];
  validators: Validator[];
  cameras: Camera[];
  isDetailView?: boolean;
}

const getStatusColor = (status: string) => {
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

export const BusDevices = ({ busId, pupitres, validators, cameras, isDetailView = false }: BusDevicesProps) => {
  const navigate = useNavigate();

  const handleDeviceClick = (type: 'pupitre' | 'validator' | 'camera', id: string) => {
    navigate(`/${type}s/${id}`);
  };

  const busPupitres = pupitres.filter(pupitre => pupitre.busId === busId);
  const busValidators = validators.filter(validator => validator.busId === busId);
  const busCameras = cameras.filter(camera => camera.busId === busId);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Dispositivos del Bus
        </Typography>
        {!isDetailView && (
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => navigate('/devices')}
          >
            Ver todos los dispositivos
          </Button>
        )}
      </Box>

      <Stack spacing={3}>
        {busPupitres.length > 0 && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" color="primary">
                Pupitres
              </Typography>
              {!isDetailView && (
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => navigate('/pupitres')}
                >
                  Ver todos
                </Button>
              )}
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {busPupitres.map((pupitre) => (
                <Chip
                  key={pupitre.id}
                  label={`Pupitre ${pupitre.id}`}
                  color={getStatusColor(pupitre.status)}
                  onClick={() => handleDeviceClick('pupitre', pupitre.id)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Paper>
        )}

        {busValidators.length > 0 && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" color="primary">
                Validadoras
              </Typography>
              {!isDetailView && (
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => navigate('/validators')}
                >
                  Ver todas
                </Button>
              )}
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {busValidators.map((validator) => (
                <Chip
                  key={validator.id}
                  label={`Validadora ${validator.id}`}
                  color={getStatusColor(validator.status)}
                  onClick={() => handleDeviceClick('validator', validator.id)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Paper>
        )}

        {busCameras.length > 0 && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" color="primary">
                Cámaras
              </Typography>
              {!isDetailView && (
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => navigate('/cameras')}
                >
                  Ver todas
                </Button>
              )}
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {busCameras.map((camera) => (
                <Chip
                  key={camera.id}
                  label={`Cámara ${camera.id}`}
                  color={getStatusColor(camera.status)}
                  onClick={() => handleDeviceClick('camera', camera.id)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Paper>
        )}

        {isDetailView && busPupitres.length === 0 && busValidators.length === 0 && busCameras.length === 0 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="body1" color="text.secondary" align="center">
              No hay dispositivos asociados a este bus
            </Typography>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}; 