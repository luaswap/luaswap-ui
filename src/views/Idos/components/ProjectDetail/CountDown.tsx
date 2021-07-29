import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Box, Text, Flex } from 'common-uikitstrungdao'
import getTimePeriods from 'utils/getTimePeriods'
import { getUtcDateString } from 'utils/formatTime'
import Timer from '../Timer'
import { PoolStatus } from '../../types'

const FlexWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`

const DateBlock = styled(Box)`
  border-top-left-radius: 50px;
  padding: 24px 14px;
  border-top-right-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-bottom: 14px;
  background: linear-gradient(107.27deg, #f5bd6d -12.7%, #d76700 122.45%);
`
const TimerBlock = styled(Box)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #282828;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 10px 30px;
`

const Title = styled(Text)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

interface CountDownProps {
  openAtSeconds: number
  closedAtSeconds: number
  claimAtSeconds: number
  openAt: number
  closeAt: number
  claimAt: number
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
  return <Timer suffix="Claim in" timeUntil={timeUntilClaim} />
}

const TimerCountDown = ({ poolStatus, openAtSeconds, closedAtSeconds, claimAtSeconds }) => {
  if (poolStatus === 'closed' || poolStatus === null) {
    return (
      <Timer
        suffix="Claim time"
        timeUntil={{
          minutes: 0,
          seconds: 0,
          hours: 0,
        }}
      />
    )
  }

  if (poolStatus === 'claim') {
    return <TimerClaim claimAtSeconds={claimAtSeconds} />
  }

  if (poolStatus === 'not open') {
    return <TimerOpen openAtSeconds={openAtSeconds} />
  }

  return <TimerClose closedAtSeconds={closedAtSeconds} />
}

const CountDown: React.FC<CountDownProps> = ({
  openAtSeconds,
  closedAtSeconds,
  claimAtSeconds,
  openAt,
  closeAt,
  claimAt,
  poolStatus,
}) => {
  const { title, date } = useMemo(() => {
    if (poolStatus === 'not open') {
      return {
        title: 'Open in',
        date: getUtcDateString(openAt),
      }
    }

    if (poolStatus === 'open') {
      return {
        title: 'Closed at',
        date: getUtcDateString(closeAt),
      }
    }

    if (poolStatus === 'claim') {
      return {
        title: 'Claim at',
        date: getUtcDateString(claimAt),
      }
    }

    return {
      title: 'Closed',
      date: '',
    }
  }, [poolStatus, openAt, closeAt, claimAt])

  return (
    <FlexWrapper flexDirection="column">
      <DateBlock>
        <Text color="#FFFFFF">{title}</Text>
        <Title color="#FFFFFF" bold>
          {date}
        </Title>
      </DateBlock>
      <TimerBlock>
        <TimerCountDown
          openAtSeconds={openAtSeconds}
          closedAtSeconds={closedAtSeconds}
          claimAtSeconds={claimAtSeconds}
          poolStatus={poolStatus}
        />
      </TimerBlock>
    </FlexWrapper>
  )
}

export default CountDown
