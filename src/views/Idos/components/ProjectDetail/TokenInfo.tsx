import React from 'react'
import { Flex, Button, Text, Box, Link } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

const TokenInfoWrapper = styled(Box)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  height: 300px;
  background-color: #282828;
  padding: 24px;
  margin-bottom: 40px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 24px;
  }
`

interface TokenInfoProps {
  currentPoolData: Pool
}

const TokenInfo: React.FC<TokenInfoProps> = ({ currentPoolData }) => {
  const { totalAmountIDO, name, idoToken } = useTotalDataFromAllPools(currentPoolData)

  return (
    <TokenInfoWrapper>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Name</Text>
        <Text color="#C3C3C3" bold>
          {name}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Token symbol</Text>
        <Text color="#C3C3C3" bold>
          {idoToken?.symbol}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text color="#8B8B8B">Total Supply</Text>
        <Text color="#C3C3C3" bold>
          {totalAmountIDO}
        </Text>
      </Flex>
    </TokenInfoWrapper>
  )
}

export default TokenInfo
