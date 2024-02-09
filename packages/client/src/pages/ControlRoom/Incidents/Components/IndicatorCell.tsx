import { memo, useState, useEffect } from 'react'
import { IIndicatorCell } from '../interfaces'
import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { convertINCStringToDateTime } from 'utils/convertDate'

export const IndicatorCell = memo(
  ({ timeSLA, timeReg, timeCloseCheck, inc }: IIndicatorCell) => {
    const [progress, setProgress] = useState(0)

    const check = () => {
      if (progress >= 100) return
      if (timeCloseCheck && timeCloseCheck.length && progress > 0) {
        return
      }
      if (timeCloseCheck) {
        const sla = new Date(convertINCStringToDateTime(timeSLA)).getTime()
        const reg = new Date(convertINCStringToDateTime(timeReg)).getTime()
        const close = new Date(
          convertINCStringToDateTime(timeCloseCheck)
        ).getTime()
        const diff = sla - reg
        const closeDiff = sla - close
        const percent = 100 - (closeDiff * 100) / diff
        setProgress(percent > 100 ? 100 : percent)
        return
      }
      const sla = new Date(convertINCStringToDateTime(timeSLA)).getTime()
      const reg = new Date(convertINCStringToDateTime(timeReg)).getTime()
      const now = new Date().getTime()
      if (now > sla) {
        setProgress(100)
        return 100
      }
      const diff = sla - reg
      const nowDiff = sla - now
      const percent = 100 - (nowDiff * 100) / diff
      setProgress(percent > 100 ? 100 : percent)
    }

    useEffect(() => {
      check()
      if (progress >= 100) return
      if (timeCloseCheck && timeCloseCheck.length && progress > 0) {
        return
      }
      const timer = setInterval(() => {
        check()
      }, 60000)
      return () => {
        clearInterval(timer)
      }
    }, [])

    return <LinearProgressWithLabel variant="determinate" value={progress} />
  }
)
