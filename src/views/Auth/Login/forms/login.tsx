import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
//import Grid from '@mui/material/Grid2';
import { useEffect, useState, useMemo } from 'react'
import logo from '../../../../assets/logo-h.png'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { signIn } from '../../../../store/slices/auth.slice'
import { useLogin } from '../../../../services/auth.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  loginRequest,
  loginSchema,
} from '../../../../validation/auth.validation'
import { AxiosError } from 'axios'
import { useLocation } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export default function LoginForm() {
  const query = useQuery()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const { mutate: login, error } = useLogin()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])

  const doLogin = (values: loginRequest) => {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: data => {
          dispatch(
            signIn({
              token: data.data.token,
              refresh_token: data.data.refresh_token,
              user: data.data.user,
            }),
          )
        },
      },
    )
  }

  const resource = query.get('resource')

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
        onSubmit={handleSubmit(doLogin)}
        noValidate
        sx={{ mt: 1, textAlign: 'center' }}
      >
        <Box
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '120px',
            minWidth: '400px',
          }}
        />
        <Typography variant="h5" fontWeight="bold">
          Iniciar sesión
        </Typography>
        {error && (
          <Alert severity="error">
            {(error as AxiosError)?.response?.status === 400
              ? 'Email o contraseña incorrecto'
              : 'Ha ocurrido un error, inténtalo de nuevo más tarde'}
          </Alert>
        )}
        <Box sx={{ mt: 2, mb: 2 }}>
          {resource === 'registered' && (
            <Alert severity="success">
              Tu cuenta ha sido creada correctamente, puedes iniciar sesión
            </Alert>
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
            autoFocus
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
          Entrar
        </Button>
        <Link href="/register">
          <Button
            color="secondary"
            fullWidth
            variant="text"
            sx={{ mt: 1, mb: 2 }}
          >
            Registrarse
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
