import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
}

export const LoadingOverlay = ({ open }: LoadingOverlayProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}; 