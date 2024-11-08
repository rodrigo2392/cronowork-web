import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {
  Card,
  CardContent,
  Alert,
  FormLabel,
  TextField,
  CardActions,
  Button,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  useCreateClient,
  useGetClientById,
  useUpdateClient,
} from '../../../../services/clients.service'
import { createClientSchema } from '../../../../validation/clients.validation'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1200,
  p: 4,
}
interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
  refetch: () => void
  id?: string | undefined
  edit: boolean
}
export default function CreateModal({
  visible,
  setVisible,
  refetch,
  edit = false,
  id,
}: Props) {
  const queryClient = useQueryClient()
  const { mutate: createClient, error } = useCreateClient()
  const { mutate: updateClient, error: updateError } = useUpdateClient()

  const { data: clientData } = useGetClientById(id)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createClientSchema),
  })

  const handleCreate = (data: { name: string; email: string }) => {
    if (edit) {
      return updateClient(data, {
        onSuccess: () => {
          refetch()
          queryClient.invalidateQueries({ queryKey: ['getClientbyId', id] })
          setVisible(false)
        },
      })
    }
    return createClient(data, {
      onSuccess: () => {
        refetch()
        setVisible(false)
      },
    })
  }

  useEffect(() => {
    if (clientData) {
      reset(clientData?.data?.user)
    } else {
      reset({
        name: '',
        email: '',
      })
    }
  }, [clientData, reset])

  return (
    <div>
      <Modal
        open={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ mt: 4 }}>
            <Box
              autoComplete="off"
              component="form"
              onSubmit={handleSubmit(handleCreate)}
              noValidate
              sx={{ mt: 1, textAlign: 'center' }}
            >
              <Card sx={{ paddingX: 2, paddingY: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Agregar cliente</Typography>
                  </Box>

                  {(error || updateError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Ha ocurrido un error, inténtalo de nuevo más tarde.
                    </Alert>
                  )}

                  <Box sx={{ textAlign: 'left', mb: 2 }}>
                    <FormLabel>Nombre</FormLabel>
                    <TextField
                      margin="normal"
                      placeholder="Nombre"
                      required
                      fullWidth
                      {...register('name')}
                      id="name"
                      autoFocus
                    />

                    {errors.email && (
                      <Typography color="error">
                        {errors.name?.message?.toString()}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      margin="normal"
                      placeholder="Email"
                      disabled={edit}
                      required
                      fullWidth
                      {...register('email')}
                      type="email"
                      id="email"
                    />

                    {errors.email && (
                      <Typography color="error">
                        {errors.email?.message?.toString()}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions sx={{ flex: 1, justifyContent: 'space-between' }}>
                  <Button onClick={() => setVisible(false)} variant="text">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    {edit ? 'Guardar' : 'Agregar'}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
