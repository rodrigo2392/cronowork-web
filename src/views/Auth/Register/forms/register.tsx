import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
//import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react'
import logo from '../../../../assets/logo-h.png'
import logow from '../../../../assets/logo-w.png'
import { Typography } from '@mui/material'
import { useRegister } from '../../../../services/auth.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  registerRequest,
  registerSchema,
} from '../../../../validation/auth.validation'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../store/slices/app.slice'

export default function LoginForm() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })
  const { mutate: login, error } = useRegister()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])

  const doRegister = (values: registerRequest) => {
    login(
      { email: values.email, password: values.password, name: values.name },
      {
        onSuccess: () => {
          navigate('/?resource=registered')
        },
      },
    )
  }

  const theme = useSelector(selectTheme)

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
        height: '80vh',
      }}
    >
      <Box
        autoComplete="off"
        component="form"
        onSubmit={handleSubmit(doRegister)}
        noValidate
        sx={{ mt: 1, textAlign: 'center' }}
      >
        <Box
          sx={{
            backgroundImage: `url(${theme === 'dark' ? logow : logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '120px',
            minWidth: '400px',
          }}
        />
        {error && (
          <Alert severity="error">
            {(error as AxiosError)?.response?.status === 400
              ? 'Email o contraseña incorrecto'
              : 'Ha ocurrido un error, inténtalo de nuevo más tarde'}
          </Alert>
        )}
        <Box sx={{ textAlign: 'left' }}>
          <TextField
            margin="normal"
            placeholder="Nombre"
            required
            fullWidth
            {...register('name')}
            id="name"
            autoFocus
          />

          {errors.name && (
            <Typography color="error">{errors.name.message}</Typography>
          )}
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <TextField
            margin="normal"
            placeholder="Email"
            required
            fullWidth
            {...register('email')}
            id="email"
          />

          {errors.email && (
            <Typography color="error">{errors.email.message}</Typography>
          )}
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <TextField
            margin="normal"
            placeholder="Contraseña"
            required
            fullWidth
            {...register('password')}
            type="password"
            id="password"
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}
        </Box>

        <Box sx={{ textAlign: 'left' }}>
          <TextField
            margin="normal"
            placeholder="Repetir contraseña"
            required
            fullWidth
            {...register('repeat_password')}
            type="password"
            id="repeat_password"
          />
          {errors.repeat_password && (
            <Typography color="error">
              {errors.repeat_password.message}
            </Typography>
          )}
        </Box>

        {/*<Grid sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 1}}>
          <Link sx={{cursor: 'pointer'}} color="secondary">
            <Typography variant='body1'>Olvidé la contraseña</Typography>
          </Link>
        </Grid>*/}

        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear cuenta
        </Button>
        <Link href="/">
          <Button
            color="secondary"
            fullWidth
            variant="text"
            sx={{ mt: 1, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
