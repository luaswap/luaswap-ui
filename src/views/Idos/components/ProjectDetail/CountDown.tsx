import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from '../Timer'
import { PoolStatus } from '../../types'

interface CountDownProps {
  openAtSeconds: number
  closedAtSeconds: number
  claimAtSeconds: number
  poolStatus: PoolStatus
}

const TimerOpen = ({ openAtSeconds }) => {
  const timeUntilOpen = getTimePeriods(openAtSeconds)
  return <Timer suffix="Open in" timeUntil={timeUntilOpen} />
}

const TimerClose = ({ closedAtSeconds }) => {
  const timeUntilClosed = getTimePeriods(closedAtSeconds)
  return <Timer suffix="Finish in" timeUntil={timeUntilClosed} />
}

const TimerClaim = ({ claimAtSeconds }) => {
  const timeUntilClaim = getTimePeriods(claimAtSeconds)
  return <Timer suffix="Claim time" timeUntil={timeUntilClaim} />
}

const CountDown: React.FC<CountDownProps> = ({ openAtSeconds, closedAtSeconds, claimAtSeconds, poolStatus }) => {
  if (poolStatus === 'closed' || poolStatus === null) {
    return null
  }

  if (poolStatus === 'claim') {
    return <TimerClaim claimAtSeconds={claimAtSeconds} />
  }

  if (poolStatus === 'not open') {
    return <TimerOpen openAtSeconds={openAtSeconds} />
  }

  return <TimerClose closedAtSeconds={closedAtSeconds} />
}

export default CountDown
