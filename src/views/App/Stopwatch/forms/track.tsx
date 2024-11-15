import {
  Box,
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import { useGetProjects } from '../../../../services/projects.service'
import {
  useGetCurrentTrack,
  useStartTrack,
  useStopTrack,
} from '../../../../services/track.service'
import useStopWatch from '../../../../hooks/stopwatch'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeTracking,
  selectIsTracking,
} from '../../../../store/slices/app.slice'
import IntervalManager from '../../../../utils/interval.util'
import { useSocket } from '../../../../services/socket.service'

interface Props {
  refetchTable: () => void
}

const intervalManager = IntervalManager.getInstance()

export default function Track({ refetchTable }: Props) {
  const { socket } = useSocket()
  const dispatch = useDispatch()
  const { data: currentProject, refetch } = useGetCurrentTrack()
  const { mutate: startTracking, error } = useStartTrack()
  const { mutate: stopTracking, error: errorStop } = useStopTrack()
  const { data: projects } = useGetProjects()
  const isTracking = useSelector(selectIsTracking)
  const [project, setProject] = useState<string>('')
  const [description, setDescription] = useState('')
  const [currentTime, setCurrentTime] = useState('00:00:00')

  function resetValues() {
    setDescription('')
    setCurrentTime('00:00:00')
  }

  useStopWatch({
    currentProject: currentProject?.data,
    setCurrentTime,
  })

  useEffect(() => {
    if (socket) {
      socket?.on('new_start_tracking', data => {
        console.log(data)
        refetch()
      })
      socket?.on('new_stop_tracking', data => {
        console.log(data)
        resetValues()
        refetch()
        refetchTable()
      })
    }
  }, [socket, refetch])

  useEffect(() => {
    if (currentProject?.data.project) {
      setDescription(currentProject?.data.project.description)
      setProject(currentProject?.data.project.project)
      dispatch(changeTracking({ state: true }))
    }
  }, [currentProject])

  const doStartTracking = () => {
    startTracking(
      {
        project,
        description,
      },
      {
        onSuccess: () => {
          refetch()
          dispatch(changeTracking({ state: true }))
          socket?.emit('start_tracking', 'el tracking ha iniciado')
        },
      },
    )
  }

  const doStopTracking = () => {
    stopTracking(undefined, {
      onSuccess: () => {
        dispatch(changeTracking({ state: false }))
        socket?.emit('stop_tracking', 'el tracking ha parado')
        intervalManager.clearAllIntervals()
        resetValues()
        refetchTable()
        refetch()
      },
    })
  }

  return (
    <Card sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2}>
        {(error || errorStop) && (
          <Typography color="error">Ha ocurrido un error</Typography>
        )}
        <Grid size={{ xs: 12, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Proyecto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              label="Proyecto"
              onChange={(evt: SelectChangeEvent<string>) =>
                setProject(evt.target.value)
              }
              disabled={isTracking}
            >
              <MenuItem value="">Selecciona un proyecto...</MenuItem>
              {projects?.data.docs.map((el: { _id: string; name: string }) => (
                <MenuItem key={el._id} value={el._id}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <FormControl fullWidth>
            <Input
              disabled={isTracking}
              onChange={evt => setDescription(evt.target.value)}
              rows={2}
              multiline
              value={description}
              placeholder="Descripción de la tarea"
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 2 }}>
          <Button
            onClick={isTracking ? doStopTracking : doStartTracking}
            disabled={project === '' || description === ''}
            variant="contained"
            color={isTracking ? 'error' : 'primary'}
            size="large"
          >
            {isTracking ? 'Detener' : 'Iniciar'}
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Box>
            <Typography variant="h4">{currentTime}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
