import { Card, CardContent, Typography, Chip, Stack, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Validator, ReaderStatus } from '../../types';
import { useValidatorStatus } from '../../hooks/useValidatorStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContactlessIcon from '@mui/icons-material/Contactless';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

interface ValidatorStatusProps {
  validator: Validator;
}

const getStatusColor = (status: Validator['status']) => {
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

const getStatusBackgroundColor = (status: Validator['status']) => {
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

const getReaderStatusColor = (status: ReaderStatus) => {
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

const getStatusIcon = (status: Validator['status']) => {
  switch (status) {
    case 'OK':
      return <CheckCircleIcon color="success" />;
    case 'WARNING':
      return <WarningIcon color="warning" />;
    case 'KO':
      return <ErrorIcon color="error" />;
    default:
      return <ErrorIcon color="error" />;
  }
};


export const ValidatorStatus = ({ validator }: ValidatorStatusProps) => {
  const navigate = useNavigate();
  const { isUpdating, error, isSuccess } = useValidatorStatus();

  const handleClick = () => {
    navigate(`/validators/${validator.id}`);
  };

  const handleBusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/buses/${validator.busId}`);
  };

  return (
    <Card 
      sx={{ 
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
        backgroundColor: getStatusBackgroundColor(validator.status),
      }}
      onClick={handleClick}
    >
      <LoadingOverlay open={isUpdating} />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
          <Chip
            label={validator.status}
            color={getStatusColor(validator.status)}
            size="small"
            icon={getStatusIcon(validator.status)}
            sx={{ 
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          />
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <DirectionsBusIcon color="primary" />
          <Link
            component="button"
            variant="body2"
            onClick={handleBusClick}
            sx={{ textDecoration: 'none' }}
          >
            Ver Bus {validator.busId}
          </Link>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Estado de los Lectores:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={validator.rfidStatus}
            color={getReaderStatusColor(validator.rfidStatus)}
            size="small"
            icon={<ContactlessIcon />}
          />
          <Chip
            label={validator.emvStatus}
            color={getReaderStatusColor(validator.emvStatus)}
            size="small"
            icon={<CreditCardIcon />}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Última actualización: {new Date(validator.updatedAt).toLocaleString()}
        </Typography>
        {error && (
          <ErrorMessage
            title="Error al actualizar el estado"
            message={error instanceof Error ? error.message : 'Error desconocido'}
          />
        )}
        {isSuccess && (
          <SuccessMessage
            title="Estado actualizado"
            message="El estado del validador se ha actualizado correctamente"
          />
        )}
      </CardContent>
    </Card>
  );
}; 