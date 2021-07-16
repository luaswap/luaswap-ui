import React, { useState, useCallback } from 'react'
import { TabMenu, Tab, Flex, Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { getUtcDateString } from 'utils/formatTime'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'

const Row = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
  }
`

interface PoolInformationProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
}

interface PoolInfoTabProps {
  currentPoolData: Pool
  tierDataOfUser: IdoDetailInfo
}

interface TokenInfoTabProps {
  tierDataOfUser: IdoDetailInfo
  currentPoolData: Pool
}

const TokenInfoTab: React.FC<TokenInfoTabProps> = ({ tierDataOfUser, currentPoolData }) => {
  const { totalAmountIDO, name, idoToken } = useTotalDataFromAllPools(currentPoolData)
  return (
    <>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Name</Text>
        <Text>{name}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Token symbol</Text>
        <Text>{idoToken.symbol}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Total Supply</Text>
        <Text>{totalAmountIDO}</Text>
      </Flex>
    </>
  )
}

const PoolInfoTab: React.FC<PoolInfoTabProps> = ({ currentPoolData, tierDataOfUser }) => {
  const { totalAmountIDO, openAt, closeAt } = useTotalDataFromAllPools(currentPoolData)

  return (
    <>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Opens</Text>
        <Text>{getUtcDateString(openAt)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Closes</Text>
        <Text>{getUtcDateString(closeAt)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Cap</Text>
        <Text>{totalAmountIDO}</Text>
      </Flex>
    </>
  )
}

const PoolInformation: React.FC<PoolInformationProps> = ({ currentPoolData, tierDataOfUser }) => {
  const [index, setIndex] = useState<number>(0)
  const onChangeTab = useCallback((idx) => {
    setIndex(idx)
  }, [])

  return (
    <Row>
      <TabMenu
        activeIndex={index}
        onItemClick={onChangeTab}
        innerStyle={{
          width: '100%',
        }}
        wrapperStyle={{
          width: '100%',
        }}
      >
        <Tab
          style={{
            width: '100%',
          }}
        >
          Pool Information
        </Tab>
        <Tab
          style={{
            width: '100%',
          }}
        >
          Token Information
        </Tab>
      </TabMenu>
      {index === 0 ? (
        <PoolInfoTab currentPoolData={currentPoolData} tierDataOfUser={tierDataOfUser} />
      ) : (
        <TokenInfoTab currentPoolData={currentPoolData} tierDataOfUser={tierDataOfUser} />
      )}
    </Row>
  )
}

export default PoolInformation
