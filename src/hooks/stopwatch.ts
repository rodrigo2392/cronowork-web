import moment from 'moment'
import { useEffect, useState, useCallback } from 'react'

interface Project {
  project: {
    start: string
    project: string
    description: string
  }
}

interface Props {
  currentProject: Project | undefined
  setCurrentTime: (val: string) => void
  setDescription: (val: string) => void
  setProject: (val: string) => void
}

export default function useStopWatch({
  currentProject,
  setCurrentTime,
  setDescription,
  setProject,
}: Props) {
  const [start, setStart] = useState(false)
  const [interval, setIntervalValue] = useState<number>(0)

  const resetValues = useCallback(() => {
    setDescription('')
    setStart(false)
    setCurrentTime('00:00:00')
    setIntervalValue(0)
    clearInterval(interval)
  }, [interval, setCurrentTime, setDescription])

  const startStopWatch = useCallback(() => {
    if (interval === 0 && currentProject?.project) {
      const currentTime = moment(new Date(currentProject?.project.start))
      setProject(currentProject?.project.project)
      setDescription(currentProject?.project.description)
      setStart(true)
      const intv = window.setInterval(() => {
        const totalTime = moment.duration(moment().diff(currentTime))
        setCurrentTime(
          `${totalTime.hours().toString().padStart(2, '0')}:${totalTime.minutes().toString().padStart(2, '0')}:${totalTime.seconds().toString().padStart(2, '0')}`,
        )
      }, 1000)
      setIntervalValue(intv)
    }
  }, [currentProject, interval, setCurrentTime, setDescription, setProject])

  useEffect(() => {
    if (currentProject?.project) {
      startStopWatch()
    } else {
      resetValues()
    }

    return () => {
      clearInterval(interval)
    }
  }, [currentProject, interval, resetValues, start, startStopWatch])

  return {
    start,
  }
}
