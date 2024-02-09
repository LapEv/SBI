import { memo, useState, useEffect } from 'react'
import { IIndicatorCell } from '../interfaces'
import { BorderLinearProgress } from 'components/LinearProgress/LinearProgress'

export const IndicatorCell = memo(({ timeSLA, timeReg }: IIndicatorCell) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      )
    }, 2000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <BorderLinearProgress variant="determinate" value={progress} />
})
