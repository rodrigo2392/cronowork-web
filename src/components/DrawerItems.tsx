import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Person from '@mui/icons-material/Person'
import AccountBox from '@mui/icons-material/Widgets'
import CalendarIcon from '@mui/icons-material/CalendarMonth'
import WatchIcon from '@mui/icons-material/Timer'

interface LinkItem {
  title: string
  icon: JSX.Element
  url: string
  enabled: boolean
  divider: boolean
}

export default function DrawerItems({ pathname }: { pathname: string }) {
  const links: Partial<LinkItem>[] = [
    {
      title: 'Clientes',
      icon: <Person />,
      url: '/clients',
      enabled: true,
    },
    {
      title: 'Proyectos',
      icon: <AccountBox />,
      url: '/projects',
      enabled: true,
    },
    {
      divider: false,
    },
    {
      title: 'Cronómetro',
      icon: <WatchIcon />,
      url: '/track',
      enabled: false,
    },
    {
      title: 'Calendario',
      icon: <CalendarIcon />,
      url: '/calendar',
      enabled: false,
    },
  ]
  return (
    <>
      {links.map((el: Partial<LinkItem>) => {
        if (el.divider) {
          return <Divider />
        }
        return (
          el.enabled && (
            <Link
              to={el.url ?? ''}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <ListItem key={el.url} disablePadding>
                <ListItemButton
                  selected={pathname === el.url}
                  LinkComponent={'p'}
                >
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )
      })}
    </>
  )
}
