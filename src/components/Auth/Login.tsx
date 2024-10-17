import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo-h.png';
import { Typography } from '@mui/material';


export default function LoginForm() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box
      className={`animated-form  ${show ? 'opacity ' : 'hidden'}`}
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh'
      }}>
      <Box
        autoComplete="off"
        component="form"
        noValidate
        sx={{ mt: 1, textAlign: 'center' }}>
        
        <Box
          sx={{
            backgroundImage:`url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "120px",
            }}
          />
        <TextField
          margin="normal"
          placeholder='Email'
          required
          fullWidth
          id="email"
          autoFocus
        />
        <TextField
          margin="normal"
          placeholder='Contraseña'
          required
          fullWidth
          type="password"
          id="password"
        />
        <Grid sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 1}}>
          <Link sx={{cursor: 'pointer'}} color="secondary">
            <Typography variant='body1'>Olvidé la contraseña</Typography>
          </Link>
        </Grid>

        <Button
          type="submit"
          color='primary'
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Iniciar sesión
        </Button>
        <Link href="/register">
        <Button
          color='secondary'
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          >
          Registrarse
        </Button>
        </Link>
      </Box>
    </Box>
  );
}
