import { ThemeProvider, createTheme } from '@mui/material'
import Auth from './auth.routes'
import App from './app.routes'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/slices/auth.slice'

export default function Navigation() {
  const defaultTheme = createTheme({
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
