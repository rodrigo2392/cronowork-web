import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/auth.slice'
import { Link } from 'react-router-dom'
import { useGetAllData } from '../../services/dashboard.service'

export default function Home() {
  const { data } = useGetAllData()
  const user = useSelector(selectUser)
  const getSaludo = () => {
    const date = new Date()
    const time = date.getHours()
    if (time > 12 && time < 19) {
      return 'Buenas tardes'
    } else if (time > 19) {
      return 'Buenas noches'
    } else {
      return 'Buenos dias'
    }
  }
  return (
    <Box sx={{ mb: 4, ml: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
          {getSaludo()}, {user?.name}
        </Typography>
      </Box>

      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
          <Card>
            <CardContent>
              <Typography sx={{ textTransform: 'capitalize' }}>
                Horas totales
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h2">{data?.data.hours}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="small">
                <Link
                  to="/track"
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  <Typography variant="body2">capturar horas</Typography>
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
          <Card>
            <CardContent>
              <Typography sx={{ textTransform: 'capitalize' }}>
                Proyectos registrados
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h2">{data?.data.projects}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="small">
                <Link
                  to="/projects"
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  <Typography variant="body2">ver proyectos</Typography>
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
          <Card>
            <CardContent>
              <Typography sx={{ textTransform: 'capitalize' }}>
                Clientes registrados
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h2">{data?.data.clients}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="small">
                <Link
                  to="/clients"
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  <Typography variant="body2">ver clientes</Typography>
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  )
}
