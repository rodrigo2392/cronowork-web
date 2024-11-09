import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import AppBarItem from '../components/AppBar'
import DrawerComponent from '../components/Drawer'
import Main from '../components/Main'
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawer, selectDrawerOpened } from '../store/slices/app.slice'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const dispatch = useDispatch()
  const open = useSelector(selectDrawerOpened)

  const handleDrawerOpen = () => {
    dispatch(changeDrawer())
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarItem isDrawerOpen={open} handleDrawerOpen={handleDrawerOpen} />
          <DrawerComponent
            isDrawerOpen={open}
            handleDrawerOpen={handleDrawerOpen}
          />
        </Box>
        <Main open={open}>
          <Box
            sx={{
              marginBottom: 4,
              paddingLeft: { xs: 2, md: 5, lg: 10 },
              paddingRight: { xs: 2, md: 5, lg: 10 },
            }}
          >
            <Outlet />
          </Box>
        </Main>
      </Box>
    </>
  )
}
