import { ThemeProvider, createTheme } from '@mui/material';
import Auth from './auth.routes';

export default function Navigation() {
  const defaultTheme = createTheme();
    return (
      <ThemeProvider theme={defaultTheme}>
        <Auth />
      </ThemeProvider>
    );
}
