import { Box } from '@mui/material';
import { Navbar } from '../Navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        '& > main': {
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 64px)', // Altura total menos la altura del navbar
          overflow: 'hidden'
        }
      }}
    >
      <Navbar />
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
}; 