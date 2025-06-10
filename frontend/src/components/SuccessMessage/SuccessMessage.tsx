import { Alert, AlertTitle } from '@mui/material';

interface SuccessMessageProps {
  title?: string;
  message: string;
}

export const SuccessMessage = ({ title = 'Éxito', message }: SuccessMessageProps) => {
  return (
    <Alert severity="success" sx={{ mt: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}; 