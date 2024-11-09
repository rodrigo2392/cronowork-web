import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import cover from '../assets/bg.png'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{ height: '100vh' }}>
          <Grid size={6}>
            <Box
              sx={{
                backgroundImage: `url(${cover})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
              }}
            />
          </Grid>
          <Grid size={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '50vh',
                overflow: 'hidden',
              }}
            >
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
