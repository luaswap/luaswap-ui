import React, { useState, useCallback } from 'react'
import { TabMenu, Tab, Flex, Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { IdoDetailInfo, Pool } from 'views/Idos/types'
import { getUtcDateString } from 'utils/formatTime'
import { IdoDetail } from 'state/types'
import useTotalDataFromAllPools from '../../hooks/useTotalDataFromAllPools'
import { calculateSwapRate } from '../helper'

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

const TokenInfoTab = () => {
  return <Flex>Token tab</Flex>
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
      {/* <Flex justifyContent="space-between" mt="20px">
        <Text>Swap Rate</Text>
        <Text>Thursday</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Total Funds Swapped</Text>
        <Text>Thursday</Text>
      </Flex> */}
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
        <TokenInfoTab />
      )}
    </Row>
  )
}

export default PoolInformation
