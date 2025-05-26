import { Box, Typography, Chip, Stack } from '@mui/material';
import type { Bus, Pupitre, Validator, Camera } from '../../types';

interface BusDevicesProps {
  bus: Bus;
  pupitres: Pupitre[];
  validators: Validator[];
  cameras: Camera[];
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

export const BusDevices = ({ bus, pupitres, validators, cameras }: BusDevicesProps) => {
  const busPupitres = pupitres.filter((pupitre) => pupitre.busId === bus.id);
  const busValidators = validators.filter((validator) => validator.busId === bus.id);
  const busCameras = cameras.filter((camera) => camera.busId === bus.id);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Dispositivos asociados
      </Typography>
      <Stack spacing={1}>
        {busPupitres.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Pupitres:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              {busPupitres.map((pupitre) => (
                <Chip
                  key={pupitre.id}
                  label={`Pupitre ${pupitre.id}`}
                  color={getStatusColor(pupitre.status)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}
        {busValidators.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Validadoras:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              {busValidators.map((validator) => (
                <Chip
                  key={validator.id}
                  label={`Validadora ${validator.id}`}
                  color={getStatusColor(validator.status)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}
        {busCameras.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Cámaras:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              {busCameras.map((camera) => (
                <Chip
                  key={camera.id}
                  label={`Cámara ${camera.id}`}
                  color={getStatusColor(camera.status)}
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}
        {busPupitres.length === 0 && busValidators.length === 0 && busCameras.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No hay dispositivos asociados
          </Typography>
        )}
      </Stack>
    </Box>
  );
}; 