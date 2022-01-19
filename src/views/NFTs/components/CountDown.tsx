import { Card, Flex, Text } from 'luastarter-uikits'
import React from 'react'
import styled from 'styled-components'

const CountDownWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
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

const CountDown = () => {
  return (
    <CountDownWrapper>
      <TimeItem>
        <TimeValue>22</TimeValue>
        <TimeText>HOUR</TimeText>
      </TimeItem>
      <TimeItem>
        <TimeValue>34</TimeValue>
        <TimeText>MIN</TimeText>
      </TimeItem>
      <TimeItem>
        <TimeValue>57</TimeValue>
        <TimeText>SEC</TimeText>
      </TimeItem>
    </CountDownWrapper>
  )
}

export default CountDown
