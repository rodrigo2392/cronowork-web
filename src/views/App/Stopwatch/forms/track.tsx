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
import { useState } from 'react'
import { useGetProjects } from '../../../../services/projects.service'
import {
  useGetCurrentTrack,
  useStartTrack,
  useStopTrack,
} from '../../../../services/track.service'
import useStopWatch from '../../../../hooks/stopwatch'

interface Props {
  refetchTable: () => void
}

export default function Track({ refetchTable }: Props) {
  const { data: currentProject, refetch } = useGetCurrentTrack()
  const { mutate: startTracking, error } = useStartTrack()
  const { mutate: stopTracking, error: errorStop } = useStopTrack()
  const { data: projects } = useGetProjects()
  const [project, setProject] = useState<string>('')
  const [description, setDescription] = useState('')
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const { start } = useStopWatch({
    currentProject: currentProject?.data,
    setCurrentTime,
    setDescription,
    setProject,
  })

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
              disabled={start}
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
              disabled={start}
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
            onClick={start ? doStropTracking : doStartTracking}
            disabled={project === '' || description === ''}
            variant="contained"
            color={start ? 'error' : 'primary'}
            size="large"
          >
            {start ? 'Detener' : 'Iniciar'}
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
