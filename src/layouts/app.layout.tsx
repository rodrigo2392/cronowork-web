import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactElement } from 'react'
import AppBarItem from '../components/AppBar'
import DrawerComponent from '../components/Drawer'
import Main from '../components/Main'

export default function AppLayout({ children }: { children: ReactElement }) {
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
          <AppBarItem
            isDrawerOpen={true}
            handleDrawerOpen={() => console.log(true)}
          />
          <DrawerComponent
            isDrawerOpen={true}
            handleDrawerOpen={() => console.log(true)}
          />
        </Box>
        <Main open={true}>
          <Box
            sx={{
              marginBottom: 4,
              paddingLeft: { xs: 2, md: 5, lg: 10 },
              paddingRight: { xs: 2, md: 5, lg: 10 },
            }}
          >
            {children}
          </Box>
        </Main>
      </Box>
    </>
  )
}
