import React, { useMemo } from 'react'
import { differenceInSecond, getDateTypeValue } from "utils/formatTime"
import useGetCountDownInSeconds from 'views/Idos/hooks/useGetCountDownInSeconds'
import Timer from '../Timer'

interface CountDownProps {
  openAt: string
  closeAt: string
}

const TimerOpen = ({ openAtSeconds }) => {
  const timeUntilOpen = useGetCountDownInSeconds(openAtSeconds)
  return <Timer suffix="Open" timeUntil={timeUntilOpen} />
}

const TimerClose = ({ closedAtSeconds }) => {
  const timeUntilClosed= useGetCountDownInSeconds(closedAtSeconds)
  return <Timer suffix="Finish" timeUntil={timeUntilClosed} />
}

const CountDown: React.FC<CountDownProps> = ({
  openAt,
  closeAt
}) => {
  const openAtSeconds = differenceInSecond(getDateTypeValue(openAt), new Date())
  const closedAtSeconds = differenceInSecond(getDateTypeValue(closeAt), new Date())
  const isClose = useMemo(() => {
    /* If open time > 0 and closed time > 0 -> the Pool is not open yet */
    if (openAtSeconds > 0 && closedAtSeconds > 0) {
      return true
    }
    return false
  }, [openAtSeconds, closedAtSeconds])

  /* Pool time is finished */
  if (openAtSeconds < 0 && closedAtSeconds < 0) {
    return null
  }

  if (isClose) {
    return <TimerOpen openAtSeconds={openAtSeconds} />
  }

  return <TimerClose closedAtSeconds={closedAtSeconds} />
}

export default CountDown
