import React from 'react'
import styled from 'styled-components'
import { Box, Text, Flex } from 'common-uikitstrungdao'
import getTimePeriods from 'utils/getTimePeriods'
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
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-bottom: 14px;
  background: linear-gradient(107.27deg, #f5bd6d -12.7%, #d76700 122.45%);
`
const TimerBlock = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #282828;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 24px 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px 14px;
  }
`

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

const CountDown: React.FC<CountDownProps> = ({ openAtSeconds, closedAtSeconds, claimAtSeconds, poolStatus }) => {
  return (
    <FlexWrapper flexDirection="column">
      <DateBlock>
        <Text color="#FFFFFF">Open in</Text>
        <Text color="#FFFFFF" fontSize="24px" bold>
          02 Aug, 2021
        </Text>
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
