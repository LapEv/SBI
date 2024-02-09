import { memo, useState, useEffect } from 'react'
import { ICustomCell } from '../interfaces'
import { BorderLinearProgress } from 'components/LinearProgress/LinearProgress'

export const IndicatorCell = memo(({ value, denseTable }: ICustomCell) => {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <BorderLinearProgress value={progress} />
})
