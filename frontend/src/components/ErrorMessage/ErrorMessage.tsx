import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export const ErrorMessage = ({ title = 'Error', message }: ErrorMessageProps) => {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}; 