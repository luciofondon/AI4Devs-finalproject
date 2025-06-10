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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX8AAACDCAMAAABSveuDAAAA3lBMVEX///8aNmHdBCsAK1oPMF2Gk6gAKVoUMl9oeJPv8fR4hp48UXb3+fpSYoCYn68AKlpAVnkAFlEAHlTbAAAAJVcAIlYAHFP97vFQX3ziMEzti5lOYoLdACfcACDqboHU2N/CyNK2vsvd4eeNl6pqdo5hb4p2hJ0rQWjo6ewxR2z1wMjO09sfO2X+9vjwoazcABj63+MAD06mr77nYnP3z9UAAEjkTGDyq7X3ztPiO1P63eK6wcyrs8Hrg5Hztb3fFjjulKDpaHwAEU4AAEHlV2njRFvqeIfeDDPvm6cAAEti5mTNAAAStklEQVR4nO2de2OavNvFpQmJiBrFxNpZJx5QHHS2rru7tfawPbvX/d7/G3rC+Rhwm6tlt99/WvAiCR/gypUDodZQO/lSN7USnf5zJtJ91rotzKjeLMvpL1Yd4HzRdtmhp2fnAq3fZq1lJMgItv7T/KGUL7QL/5N8jfL4A0FGR/5H/ofTkf9hdeR/WB35H1ZH/ofVkf9hdeR/WB35H1ZH/ofVkf9hdeR/WB35H1ZH/ofVkf9hdeR/WB35H1ZH/ofVkf9hdeR/WP0O/8e1QL0vWesj/1z9Bv+LpzciPWStj/xz9Rv8f05H/rk68j+sjvwPqyP/w+rI/7B6rfybnvZbhleoV8dfMfWNPDdanuaN9sRU9luSVyUhf3II/uamsdIYIjAUIFRbzjfT/Rbm9UjIXyLdhK6WaWeg2FfdfP2vns2onP+0vepTgLMWGKJ+Z7PTU6AMfXX820d2t1rt2NHbzlAON6xOx33RwQqPqFkG/EqG22Zg7KhthkdsOrSL61aYgJdfw9+hd4IC+Ds2KrtaLkLztMT80xA6Gf5qDitXoJHNqIy/bmhIlJ6TPWKLHR4CBfU1/vQw7Wrh7TAI39Ao6kYElgAuw8uh9yFz0tUp9QutawAxpg29020ziJzj2Z1/gMoI6zPQD66WTh0DRvrePTf5qDHoFsA7oM4gY+yj8GWWV8Jf75DSggCpYWbTTaq53U7mkGy2W5+3ASW+sQBQDYo/7fPKLaBZ05kEHHI6CAo9hFJ7rNd1b6uNQGOynVG88vKeUWBY062N4dhPAMDFZNteYs1N09xuNzZebbdb197s4o4+3tSFD+9r4F8zDbRTMchqW3YBXGT96HQNIDkbLdg1w5+XNjRi/CU6ifO34aAZT8z5lZeeOX9qzSVcOendheY6oM7NPaEgcGpNG3ai5Evq0cPzx62tLfotY6styqsBzj96Tnz+Muj792tTJfMGAEEynD+GqhLjv8K2Hk+MOtdcJy7l2rTrYVZWcOUn4PGfauFJK5x/wGqswVZhiQ/PX8JkxyI4QmqpD8rhP11hGNTyfbQZMzTxf9cZnC/pLMZ/xjCRlSgx9/6fEe/+t4L7uQNtPwGAHP4NwIJnM86/JkFQ+NC+Av4/Jwj0gtPxkMX5Q2m5tBm+CiDMSN9UVNDyN3WGNhuGphH/Wl2DhG3CxICs67KGbTdNiyHvlxh/yV4uAUFqyCXOf2pTyNSxsLCV4y9hSS+in+XPNH4Ngvu92QFDpzCafzacf7s2JEMr4l+7GzLM5CAxCVDKCPZq7Fz+QEMSboSPTIJ/rdmWACTCIlePP/fXwmg6l//EUgNnzR0yhcZk0oDUfx5c/hYCdYlEhW5uIUZjPzGstgaG7Me+ef4HNKwZCR1amj+PgRYoUaUnVEH+/AkobAlk/f+Whr0pDSDxgJxIQQTk8q8tCE4WegPQzE8MbWuxBnrfM1OW0Pc3bv3Lw6Iwvs3wd0JaLCpxFflL6fNLKstfUSEKy+wWGkvIs/H4mzAq9Nj5YQqI7CdG49UnB+223baAJOLPNkWhWYK/67baBIpqgEryl9Dip/jXNtR/nd9CxL2vJ9SLJ33+tQ0LCz2k8mQygNokj3+trcHOxNpgDKZx/uYy8EdJ/uZHdTPZgKD19rfwl2hBTNdmX2P8KVQcd0GgWz8uKHIrj+ZX4kVAep+5V2YF/P4H8yOi3EFpRtD/oCWzMjTC+O9hAXSqOVdyxrTAxSmYhKzaV4hbg+4r7n/4JeGluBmwbQ2iH+WW4YDftFru/Wy05t5pLFotL6Bstbb+X5+fOWupqrFpBom1wr4Kf8+8ow4boT+xvJRNoxW0qRWjtQhZ6Yuh2pnrwsJWlL/XaSNQfNgmGMPx/0ZDOsE/6b/Ov0qsyZozBqQo8X3JDLKHKEpRA7iq/CUmbtNUSZXlH3WhVVpi/pAmpKkvwh9DQAgBsGAowFf3r3gAhPzh/G6SkJ4+dN/8MaDacmjIXA1DZbTkyYQFNUB19Bvj7/vlD+mqsTWVsDY0twYoPgT9DYPCr4Q/kep6Jkyw6nmjwdExcjaXyulV8Mesnn8v35GiIWH1L5iY8hr4A0nYoTktugBUzzmg4Wg2CYOFTcNTKottYxFrwbU9m2CagtUYDhfbF5n89Qr4k6IFKE1JfAHyauAxBUTTGMUBb4MBpmlaegZCg11F8VPToJ6R3+fjdjFc7XkCVL4Ozx93Ct2ILg6D8Cp75BhitS0bJOi/r80BaMxmMzl1/zeAFucPgewYubumGNuzzaK4WPvS4fmXzb+VxcPDSM9Yj6HbMNugINk56Od1FaX5d6OfdG+M62Uql9fPX1kJPZDXl5yQz7/WgppXpe/KPyqEzsDLRVavn3+tTUX88SpjHPBvE6a7O+aAWaZppvNI89em3Mi75acSRuIJU3tWBfg3l8IHAGQwBfw3KOQvsW73Y3q8IM1f6nMj/5S3DILu7GXmvleAf20mDJ2yFUAef8ewlH/8lMcthtHwWP/6svpC/plxpdD/RPzZWFHK/Y8ZN2rerSB5kf6lKvCv2aKMsp3QAX/O14s4f77+dWWqEL6EB6oE/4aw7ZCpgH3+JsaS5z/E/KMujxR/90CZ4JdwQJXgPxFGQFdpU85/OB5vV7jvu6Y5oJOxZVkpmA2AtuFuzp9Zjrw541C2FD2aMfpHVQn+U2ETTEsPwowBhghR0g2KMAeYIEq/pvsfkLv7yptVbgDMN2jXPedGFyFAoZZtXPwBVYJ/TcifTlKW45XqKJpx0PB2LFOGM3+3O7mhufC33ItkzjqY4U7p91f2omrwF+ZEM5QUV+nt5JSFmjvHIbY7ZaRMp9MXaoBVg7/4Lc0XcRJ/UNXgPxM5IFA0EbEKqgb/OyY62Kj4K/LV4K8jwcHZWUkVUzX4W8IGWGZWUsVUDf5jwbFcFR+Drwb/qS3Cbx/5H5Q/PfJ/Af7iMchuiv9UVf2CG2on6mFbqLHlQ8bBp0D9bcuwsW3oqTy9D4bW49NQGqo6iW1Eq0jUZC9JNTrxmRr7gunQ+9BolNa0bmPJWeOj6vz7Kf5jQP0mWQfYIf+mQa6iXCyCiaZpfeZt3gGANNZPd2XLFDONEapGqUgQhG/51gzyNcp7gTDlSX4NE1FWEEQntnRW5GCIBq8hjW1CNMaW1b//M/xh0CTuwIh/LdHBbEFYdycXe5srKLWnm1Z6DphMyOau3YHRu2Z3PAqmYZpzGHv2FgDOEpOUnXUlogmqS7zcTjZDCPzrYwDYGE+M7X+Vf+LkNNiq5UgmzsCBAqNpjgaU7GjELcUfJK/fAiwlFHaOLOGKZ690cN/bVuHS/+XIv9bHq7zZpx7/mg1D/n24mJNwaZNC/uaKNIZgEGz6q6bMoT9eocJgft5/kz9YWLqu+3sWFKN2tgwyofp03CAsuIu3tD9uo26QaNr/tHmK4WiEzpC+peGL+t79b9nBS6ptTep7a3xUhL9wCko6/tmNv/NyDwvCF8VgGK1Sbzm68+4wBChyTnOwapos7HFN8XeWidDC6rcOpOY0miHPiz9sDSXYD8KnhgbR0pmTUQ3+4vif/BJ/vBp0OmHXXXOzojAzQ0UmuDMYrIDtp6cgZ1rcEPgLk2X4qzzJ4LzNpVPTDsJlJzh/xniuUR6TDsVOpFZ1/un27278uU1icVFlhjKLSshEmzabpgH8Ny03lLTH44W3XFwt63/02HqlEwRc26BS4PHPZmsn6vlmG2NqVYT/7v0/v1D/umpH6ycFBSZ95/gJ8pcu4NEP0jQQDvmk6189dmxo6zsg1//LKLl00ZbwYlSD/+79n7/A3x1qHMP0UKYf/7SR94MJsWRz4WBxh3k8yWT8o1AJu7YS9Xa48Y9pB2um1EwnZdPmRa0Gf100ASXT/5/gv9GDKMeA9I7/7y+ixOMf5xfdh2O3Lb2D/flyUYEJ3er6DGKvybXxVzjhu/2JXZBOwiT9+Ef3fpr4i3bMgknAXvzZIMF0AQPKlm44ixBVg79wAhCcpyzHgIX9D5D1+123Edo0CNT6/f7/uVlZCBK+0dVcO6tLGGWApd/CkalzPCPe+hy1FtJcdxMuFJpIcoEg5RtXXgA0RN56P+O+b2sTJ9iaQuJVyKZNnTW1aKcq/T/i8d90TtNBsI5tfeCq5ZJoeBuetxoPfHmGVr2jqp1MC6DtHe6vtDFtDbz5oM3BwIOcSHLmp+j6+6Y68IrVNAbeybUG7iog8sBfFXcsO1nKZlXiH+PPzn9oFi6R8WfkZ1kN/sLmV3YCdMVUCf5N4fy3dKVZOVWCvyXk36/6GgSV4L8VTT+RtF8769ejSvAXFhKrZYe+dlWCv/D9r8pPP6wEf100+zBn+nPVVAX+wtePJPG6ylVRBfib4hU4QMVnHxa8W/t6+M+E0Q/uFB9ZAQn55zFM6oX4m+LX3/f9jbIDSMi/fGbxC/GvixduKlmIvgoSv9qplX3oY1/r/wjXpna1ERaw+pPPue6Ep1f6cO9r/SuoFtzGesHHYcpd5OuXcGSv7L7c4/pvUNqIbuQ7XLT+247u5+Jif1a10z1a1ZzFboQqXJetttf1J9nwLi+v5qxo+T043M39XP/z+V251aedrC4/POZ82z5rdXZTbuVKEc7s4B6o+ALsc/1PqK3amcdtuxL7fmnX6Of0bY/r22WJ1QfH6kOJ1cW9Y/XvpxKrJ8fq7HqX0hW82uxw7Mq6qSiKOb5rLzMTxPa7/i1G3aU8sfyL0JzeNTRavAh0dvGlXBbn/FZ899j7XuBeLt70zvlt/e680Kr2vrf+wR+nz70PRe7lZt17ch660qvpaVG8Lq33K0QkPT3mD6y/jQmCkm13hh3bxqjMfpflbx9O1m88ou9Ho/citjfcyvvv6fz8vSitd2e9e4/7w2PvjSitT2e976HV/Q5VyrbwGY+dbuZp/1Prz+OiOjeSVjr0cv2t9za8B0+/r89yHfynzzGry7e9z7nu5fZD75/bYOPizSi/GrjkVqHfOX06fyyvBgoq4ISyt9th1/8v7Xq+TAPnlyPrEk7TwK//7X3JWF3cj84SwG/joMO00pfl8kuOVUrNwW5fYMjMtDn09y9KouMfo6wr4Q4+6RIunkbnmVuUu6P71J7n3lPalUSOJrJaZ9xS1iojcfdWQq/s+xe0eOIJr3Dv8877qTeKXZWHk1xH7lTasfuYO/7cCveh51S0gXi1/CXP6ua896awqOLFjRLCy3S4cUj+sLDrgfsQUfBx+r336PubhONPWX3pBb7r8pvQh/Cw6dm/TtzxfxZ5Gi8EE0s4uSmp9Ez7w/IvaPqefh/l17Sebj+vP9y61cNjQSB/fTZyrE7fnD8XNLgu/3EvzsWbk5MCxJff1v8UZCUe3ksos4zdAfnTgqbX++f1urCNej0and//OFmPCtu71+vR+Y+bs7UT8ot1sR6Nvj9wq/siq9OT0eiDOBYd7vQAZKY6HY4/KVp15tO/67UwiHf0brQ+e/j0ueQqvVvz8On622hd6L1v1+vHh+sP6/X3QquT9eONmP/46y4nnRnr3gv/og4ekWDOuvNx8VZXQcuHt2Ldy1NcMT6tvYraaTmLAxhegbuBEa+i3xZYpcOutBq7VMEoHXHsg7+tr376uYCwtOPhR68n8MfvniMW4orxYRQFRu9H8TAnkdZZFPLc5IdSNXFgFFNT3cEDZaDugT9Wa0pnt/g3Sny5w5xDHuac5VR5Tq/MbbTJ20d5nZ6pvpvT+/VzjtVlsgnGg6G8NrETGJX013FNxWOsoTINsD3wd74gotR/6gKg4W5TPnM6wPhFSePmlUX65rx8u05bcYjfbpO7Tp9G6c6FnDbxhWO1y7iCXt7nkhmn3QN/7zWd9g5fuwuPmO86Vf/i5jHRHr14/5zXBXfzPIq3bS9+nJ/kEHt3tk5UAzwwepN1Ku8+JyuLh7P8VmCOLFzmgjKfe9rH/e/dy5a94yMAtZ+Z8cDbsZFLEFaRp/e9s7hVfnV78SMWVYk7l98nrdJPTYFMtawj1E49+L/PP+rTmNEdQgDMOj853fw08L6332Ldl2k5Ptr98baIGL9Oj65fOn1bMLhy8d2/5o7VDgNqMc1IcSgC9s4/1odpNlBJKArZKr3Y8A5yRkuubwN0BVZvr6+z1UNSzkW8vn3qPRd2J7hdEbc/1qNdhyBDTRtQzACD/6Xa/IoKYL5oTt+wTLN2iU97m/KKCSsCDNjwFz+I9vC4Xj8XNmId3fBW84lwhCYQd/CjUY7jz7Ha1fEnNJXVvNsQQwTUup6uf+ctgQY5nZPtQY5dsktDmRhLmvPJR0yQurB+ea7Pxf33HUYCT+/LOordtH582MGl72aVK8WSOzZElHj3NiAUQWllbMYv84agqTfi2RNCCV52ZunV+/9uKWN90pbrjmbtiT4umwj3J7O/06fVn+Qm1v8DHLYvICIkcgAAAAAASUVORK5CYII=" 
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