import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          padding: '10px 0',
        }}
      >
        <img
          src="https://www.tib.org/image/layout_set_logo?img_id=37193&t=1748326543069"
          alt="TIB Logo"
          style={{ height: '40px' }}
        />
        <img
          src="https://www.trensfm.com/LogoSFMGOV.png"
          alt="SFM Logo"
          style={{ height: '40px' }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_EMT_Palma_2019.png/250px-Logo_EMT_Palma_2019.png"
          alt="EMT Palma Logo"
          style={{ height: '40px' }}
        />
      </Box>
      <Typography variant="caption" color="text.secondary" align="center">
        © {new Date().getFullYear()} Lucio David Fondón Terrón
      </Typography>
    </Box>
  );
}; 