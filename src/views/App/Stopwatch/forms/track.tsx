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
import moment, { Moment } from 'moment'
import {
  useGetCurrentTrack,
  useStartTrack,
  useStopTrack,
} from '../../../../services/track.service'

interface Props {
  refetchTable: () => void
}

export default function Track({ refetchTable }: Props) {
  const { data: currentTrack, refetch } = useGetCurrentTrack()
  const { mutate: startTracking, error } = useStartTrack()
  const { mutate: stopTracking, error: errorStop } = useStopTrack()
  const [start, setStart] = useState(false)
  const [startTime, setStartTime] = useState<Moment | null>(null)
  // const [endTime, setEndTime] = useState<Moment | null>(null)
  const { data: projects } = useGetProjects()
  const [project, setProject] = useState<string>('')
  const [description, setDescription] = useState('')
  const [interval, setIntervalValue] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const handleChange = (evt: SelectChangeEvent<string>) => {
    setProject(evt.target.value)
  }

  const setValues = () => {
    setStartTime(null)
    setProject('')
    setDescription('')
    setStart(false)
    setCurrentTime('00:00:00')
    clearInterval(interval)
  }

  const doStartTracking = () => {
    startTracking(
      {
        project,
        description,
      },
      {
        onSuccess: () => {
          refetch()
        },
      },
    )
  }

  const doStropTracking = () => {
    stopTracking(undefined, {
      onSuccess: () => {
        refetch()
        refetchTable()
      },
    })
  }

  useEffect(() => {
    if (currentTrack?.data.project) {
      console.log({ data: currentTrack?.data.project })
      const currentTime = moment(new Date(currentTrack?.data.project.start))
      setStartTime(currentTime)
      setProject(currentTrack?.data.project.project)
      setDescription(currentTrack?.data.project.description)

      setStart(true)
    } else {
      setValues()
    }
  }, [currentTrack, start])

  useEffect(() => {
    if (currentTrack?.data.project) {
      const intv = setInterval(() => {
        const totalTime = moment.duration(moment().diff(startTime))
        setCurrentTime(
          `${totalTime.hours().toString().padStart(2, '0')}:${totalTime.minutes().toString().padStart(2, '0')}:${totalTime.seconds().toString().padStart(2, '0')}`,
        )
      }, 1000)
      setIntervalValue(intv as unknown as number)
    } else {
      console.log('clear interval')
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [currentTrack?.data.project, interval, start, startTime])
  return (
    <Card sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2}>
        {(error || errorStop) && (
          <Typography color="error">Ha ocurrido un error</Typography>
        )}
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Proyecto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              label="Proyecto"
              onChange={handleChange}
              disabled={start}
            >
              <MenuItem value="">Selecciona un proyecto...</MenuItem>
              {projects?.data.docs.map((el: { _id: string; name: string }) => (
                <MenuItem value={el._id}>{el.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth>
            <Input
              disabled={start}
              onChange={evt => setDescription(evt.target.value)}
              rows={2}
              multiline
              defaultValue={description}
              placeholder="Descripción de la tarea"
            />
          </FormControl>
        </Grid>
        <Grid size={2}>
          <Button
            onClick={start ? doStropTracking : doStartTracking}
            disabled={project === '' || description === ''}
            variant="contained"
            color={start ? 'error' : 'primary'}
            size="large"
          >
            {start ? 'Detener' : 'Iniciar'}
          </Button>
        </Grid>
        <Grid size={2}>
          <Box>
            <Typography variant="h4">{currentTime}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
