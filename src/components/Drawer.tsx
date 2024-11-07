import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import AccountBox from '@mui/icons-material/Widgets';
import { Box, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  boxShadow:
    '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
}));

const drawerWidth = 300;

export default function DrawerComponent({
  isDrawerOpen
}: {
  handleDrawerOpen: () => void;
  isDrawerOpen: boolean;
}) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
        }
      }}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}>
      <DrawerHeader>
        <Tooltip title="Tu compañero de ventas">
          <Box
            component="img"
            src={"/logo-h.png"}
            sx={{
              objectFit: 'contain',
              cursor: 'pointer',
              height: 60
            }}
          />
        </Tooltip>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={'/'} disablePadding>
          <ListItemButton selected={pathname === '/'} LinkComponent={'a'} href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem key={'/projects'} disablePadding>
          <ListItemButton selected={pathname === '/projects'} LinkComponent={'a'} href="/projects">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Proyectos" />
          </ListItemButton>
        </ListItem>
        <ListItem key={'/clients'} disablePadding>
          <ListItemButton selected={pathname === '/clients'} LinkComponent={'a'} href="/clients">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
