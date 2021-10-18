import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Flex, PocketWatchIcon, Text, Box } from 'luastarter-uikits'
import { useTranslation } from 'contexts/Localization'

const TimeBlock = styled(Flex)`
  border-radius: 10px;
  background-color: #1a1a1a;
  display: flex;
  width: 33%;
  height: 100%;
  margin-right: 4px;
  padding: 5px;
  flex-direction: column;
`

const StyledText = styled(Text)`
  @media screen and (max-width: 400px) {
    line-height: 1;
  }
`

interface Props {
  suffix: string
  timeUntil: {
    hours: number
    minutes: number
    seconds: number
  }
}

const Timer: React.FC<Props> = ({ suffix, timeUntil }) => {
  const { t } = useTranslation()
  const { hours, minutes, seconds } = timeUntil

  return (
    <Box
      height="100%"
      width="100%"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <Text mb="5px" color="#8B8B8B">
        {suffix}
      </Text>
      <Flex flexDirection="row" width="100%">
        <TimeBlock>
          <Text color="#C3C3C3" bold>
            {hours}
          </Text>
          <Text color="#8B8B8B">HOURS</Text>
        </TimeBlock>
        <TimeBlock>
          <Text color="#C3C3C3" bold>
            {minutes}
          </Text>
          <Text color="#8B8B8B">MINS</Text>
        </TimeBlock>
        <TimeBlock>
          <Text color="#C3C3C3" bold>
            {seconds}
          </Text>
          <Text color="#8B8B8B">SECS</Text>
        </TimeBlock>
      </Flex>
    </Box>
  )
}

export default Timer
