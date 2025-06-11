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
        overflow: 'hidden'
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: { xs: '100%', sm: `calc(100% - 260px)` }, // Ancho total menos el ancho del drawer
          height: 'calc(100vh - 64px)', // Altura total menos la altura del navbar
          overflow: 'auto',
          ml: { sm: '260px' }, // Margen izquierdo igual al ancho del drawer
          mt: '64px', // Margen superior igual a la altura del navbar
          p: 3,
          boxSizing: 'border-box'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}; 