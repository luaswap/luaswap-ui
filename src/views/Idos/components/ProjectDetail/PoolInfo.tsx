import React from 'react'
import { Flex, Button, Text, Box, Link } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'
import { getUtcDateString } from 'utils/formatTime'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

const ProjectInfoWrapper = styled(Box)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  height: 300px;
  background-color: #282828;
  margin-bottom: 40px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
  }
`

interface PoolInfoProps {
  currentPoolData: Pool
}

const PoolInfo: React.FC<PoolInfoProps> = ({ currentPoolData }) => {
  const { totalAmountIDO, openAt, closeAt } = useTotalDataFromAllPools(currentPoolData)

  return (
    <ProjectInfoWrapper>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Open</Text>
        <Text color="#C3C3C3" bold>
          {getUtcDateString(openAt)}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Closes</Text>
        <Text color="#C3C3C3" bold>
          {getUtcDateString(closeAt)}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Cap</Text>
        <Text color="#C3C3C3" bold>
          {totalAmountIDO}
        </Text>
      </Flex>
    </ProjectInfoWrapper>
  )
}

export default PoolInfo
