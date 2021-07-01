import React, { useState, useCallback } from 'react'
import { TabMenu, Tab, Flex, Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { Pool } from 'views/Idos/types'
import { getUtcDateString } from 'utils/formatTime'
import { IdoDetail } from 'state/types'
import { calculateSwapRate } from './helper'

const Row = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
  }
`

interface PoolInformationProps {
  currentPoolData: Pool
  idoDetail: IdoDetail | null
}

interface PoolInfoTabProps {
  currentPoolData: Pool
  idoDetail: IdoDetail | null
}

const TokenInfoTab = () => {
  return <Flex>Token tab</Flex>
}

const PoolInfoTab: React.FC<PoolInfoTabProps> = ({ currentPoolData, idoDetail }) => {
  const { closeAt, openAt, totalAmountIDO } = idoDetail

  return (
    <>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Opens</Text>
        <Text>{getUtcDateString(openAt)} UTC</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Closes</Text>
        <Text>{getUtcDateString(closeAt)} UTC</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Cap</Text>
        <Text>{totalAmountIDO}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Swap Rate</Text>
        <Text>Thursday</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <Text>Total Funds Swapped</Text>
        <Text>Thursday</Text>
      </Flex>
    </>
  )
}

const PoolInformation: React.FC<PoolInformationProps> = ({ currentPoolData, idoDetail }) => {
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
      {index === 0 ? <PoolInfoTab currentPoolData={currentPoolData} idoDetail={idoDetail} /> : <TokenInfoTab />}
    </Row>
  )
}

export default PoolInformation
