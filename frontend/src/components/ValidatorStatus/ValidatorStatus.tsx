import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Validator, ValidatorStatus as ValidatorStatusType, ReaderStatus } from '../../types';
import { useValidatorStatus } from '../../hooks/useValidatorStatus';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContactlessIcon from '@mui/icons-material/Contactless';

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

const getReaderStatusIcon = (status: ReaderStatus) => {
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
  const { updateStatus, isUpdating, error, isSuccess } = useValidatorStatus();

  const handleStatusChange = (newStatus: ValidatorStatusType) => {
    updateStatus({ validatorId: validator.id, status: newStatus });
  };

  const handleClick = () => {
    navigate(`/validators/${validator.id}`);
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
      <CardContent>
        <Typography variant="h6" component="div">
          Validadora {validator.id}
        </Typography>
        <Chip
          label={validator.status}
          color={getStatusColor(validator.status)}
          size="small"
          sx={{ mt: 1 }}
          icon={getStatusIcon(validator.status)}
        />
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
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
          Bus ID: {validator.busId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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