import moment from 'moment'
import { useEffect } from 'react'
import IntervalManager from '../utils/interval.util'

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
}

const intervalManager = IntervalManager.getInstance()

export default function useStopWatch({
  currentProject,
  setCurrentTime,
}: Props) {
  function startStopWatch() {
    intervalManager.clearAllIntervals()
    if (currentProject?.project) {
      const currentTime = moment(new Date(currentProject?.project.start))
      intervalManager.setInterval(() => {
        const totalTime = moment.duration(moment().diff(currentTime))
        setCurrentTime(
          `${totalTime.hours().toString().padStart(2, '0')}:${totalTime.minutes().toString().padStart(2, '0')}:${totalTime.seconds().toString().padStart(2, '0')}`,
        )
      }, 1000)
    }
  }

  useEffect(() => {
    startStopWatch()
  }, [currentProject])
}
