import { Card, Flex, Text } from 'luastarter-uikits'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useGetCountDownInSeconds from 'views/Idos/hooks/useGetCountDownInSeconds'
import useNFTPoolStatus from '../hook/useNFTPoolStatus'

const CountDownWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`

const TimeItem = styled(Card)`
  background: #353535;
  border-radius: 8px;
  width: 65px;
  height: 70px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TimeValue = styled(Text)`
  font-weight: 900;
  font-size: 18px;
  color: #ffffff;
`

const TimeText = styled(Text)`
  font-weight: normal;
  font-size: 10px;
  color: #8b8b8b;
`

const CountDown = ({ NFTPoolDetail }) => {
  const [poolStatus] = useNFTPoolStatus(NFTPoolDetail)
  const countDownTime = useMemo(() => {
    if (poolStatus === 'upcoming') {
      return NFTPoolDetail.untilOpen
    }
    if (poolStatus === 'opening') {
      return NFTPoolDetail.untilClose
    }
    return 0
  }, [poolStatus, NFTPoolDetail])
  const timeUntil = useGetCountDownInSeconds(countDownTime)
  return (
    <CountDownWrapper>
      <TimeItem>
        <TimeValue>{timeUntil.hours}</TimeValue>
        <TimeText>HOURS</TimeText>
      </TimeItem>
      <TimeItem>
        <TimeValue>{timeUntil.minutes}</TimeValue>
        <TimeText>MINS</TimeText>
      </TimeItem>
      <TimeItem>
        <TimeValue>{timeUntil.seconds}</TimeValue>
        <TimeText>SECS</TimeText>
      </TimeItem>
    </CountDownWrapper>
  )
}

export default CountDown
