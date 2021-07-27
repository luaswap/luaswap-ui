import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Flex, PocketWatchIcon, Text, Box } from 'common-uikitstrungdao'
import { useTranslation } from 'contexts/Localization'

const TimeBlock = styled(Flex)`
  border-radius: 10px;
  background-color: #1a1a1a;
  display: flex;
  width: 33%;
  margin-right: 4px;
  flex-direction: column;
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
          <Text color="#8B8B8B">HOUR</Text>
        </TimeBlock>
        <TimeBlock>
          <Text color="#C3C3C3" bold>
            {minutes}
          </Text>
          <Text color="#8B8B8B">MIN</Text>
        </TimeBlock>
        <TimeBlock>
          <Text color="#C3C3C3" bold>
            {seconds}
          </Text>
          <Text color="#8B8B8B">SEC</Text>
        </TimeBlock>
      </Flex>
    </Box>
  )
}

export default Timer
