import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TvIcon from '@mui/icons-material/Tv';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Link } from 'react-router-dom';

const drawerWidth = 260;

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/buses':
      return 'Buses';
    case '/pupitres':
      return 'Pupitres';
    case '/validators':
      return 'Validadoras';
    case '/cameras':
      return 'Cámaras';
    case '/map':
      return 'Mapa';
    default:
      return 'Buses';
  }
};

const menuItems = [
  { text: 'Buses', icon: <DirectionsBusIcon sx={{ fontSize: 24 }} />, path: '/buses' },
  { text: 'Pupitres', icon: <TvIcon sx={{ fontSize: 24 }} />, path: '/pupitres' },
  { text: 'Validadoras', icon: <CreditCardIcon sx={{ fontSize: 24 }} />, path: '/validators' },
  { text: 'Cámaras', icon: <VideocamIcon sx={{ fontSize: 24 }} />, path: '/cameras' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    const searchParams = new URLSearchParams(location.search);
    navigate(`${path}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#1a1a1a',
      color: '#fff',
      borderRight: '1px solid rgba(255, 255, 255, 0.12)'
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        bgcolor: '#000'
      }}>
        <Typography variant="h5" component="div" sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #00bcd4 30%, #2196F3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px'
        }}>
          NeoBus
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, px: 2, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 188, 212, 0.15)',
                  color: '#00bcd4',
                  '&:hover': {
                    bgcolor: 'rgba(0, 188, 212, 0.2)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? '#00bcd4' : 'rgba(255, 255, 255, 0.7)',
                minWidth: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  letterSpacing: '0.5px'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/map')}
            selected={location.pathname === '/map'}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(0, 188, 212, 0.15)',
                color: '#00bcd4',
                '&:hover': {
                  bgcolor: 'rgba(0, 188, 212, 0.2)',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === '/map' ? '#00bcd4' : 'rgba(255, 255, 255, 0.7)',
              minWidth: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Link to="/map" className="nav-link">Mapa</Link>
            </ListItemIcon>
            <ListItemText 
              primary="Mapa" 
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: location.pathname === '/map' ? 600 : 400,
                letterSpacing: '0.5px'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        bgcolor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <img 
            src="https://www.trensfm.com/LogoSFMGOV.png" 
            alt="SFM" 
            style={{ 
              height: '30px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.8
            }} 
          />
          <img 
            src="https://www.caib.es/pidip2front/files/annexes/2022/2/25/2719660.png" 
            alt="TIB" 
            style={{ 
              height: '30px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.8
            }} 
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_EMT_Palma_2019.png" 
            alt="EMT" 
            style={{ 
              height: '30px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.8
            }} 
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 0.5
        }}>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            fontSize: '0.75rem',
            letterSpacing: '0.5px'
          }}>
            © 2024 NeoBus
          </Typography>
          <Typography variant="caption" sx={{ 
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            fontSize: '0.7rem',
            letterSpacing: '0.5px'
          }}>
            Desarrollado por Lucio David Fondón Terrón
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#000',
          color: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: '#fff'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" component="div" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00bcd4 30%, #2196F3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}>
              NeoBus
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ opacity: 0.2 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              letterSpacing: '0.5px'
            }}>
              {getPageTitle(location.pathname)}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
              boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
              boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}; 