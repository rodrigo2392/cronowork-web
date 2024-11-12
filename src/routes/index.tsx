import { PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import Auth from './auth.routes'
import App from './app.routes'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/slices/auth.slice'
import { blue } from '@mui/material/colors'
import { selectTheme } from '../store/slices/app.slice'

export default function Navigation() {
  const theme = useSelector(selectTheme)

  const defaultTheme = createTheme({
    palette: {
      mode: theme as PaletteMode,
      primary: {
        main: blue[700],
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
  })
  const token = useSelector(selectToken)
  return (
    <ThemeProvider theme={defaultTheme}>
      {token ? <App /> : <Auth />}
    </ThemeProvider>
  )
}
