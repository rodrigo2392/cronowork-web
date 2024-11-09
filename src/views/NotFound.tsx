import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">Página no encontrada</Typography>
      </Box>

      <Link to="/" style={{ color: 'inherit' }}>
        <Typography variant="h6">Click para ir al inicio</Typography>
      </Link>
    </Box>
  )
}
