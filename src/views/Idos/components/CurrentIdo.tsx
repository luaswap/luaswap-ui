import React from 'react'
import { Text, Flex } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { OpenPools } from 'state/types'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'
import PageLoading from './PageLoading'
import { Pool } from '../types'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const PoolContainer = styled.div`
  border-radius: 24px;
  background-color: #282828;
  width: calc(50% - 14px);
  margin-right: 14px;
  padding: 0px 24px;
`

interface CurrentIdoProps {
  openPools: OpenPools
  isLoadingState: boolean
}

const CurrentIdo: React.FC<CurrentIdoProps> = ({ openPools: { openingPools, upcomingPools }, isLoadingState }) => {
  return (
    <IdoLayout>
      <Flex>
        <PoolContainer>
          <Text fontSize="24px" textAlign="center" color="#F6F6F6" pt="24px" pb="24px" fontWeight="700">
            Opening Pools
          </Text>
          <Row>
            {isLoadingState ? (
              <PageLoading />
            ) : (
              openingPools.map((pool) => {
                return <PoolDetail pool={pool} />
              })
            )}
          </Row>
        </PoolContainer>
        <PoolContainer>
          <Text fontSize="24px" textAlign="center" color="#8B8B8B" pt="24px" pb="24px" fontWeight="700">
            Upcoming Pools
          </Text>
          <Row>
            {isLoadingState ? (
              <PageLoading />
            ) : (
              upcomingPools.map((pool) => {
                return <PoolDetail pool={pool} />
              })
            )}
          </Row>
        </PoolContainer>
      </Flex>
    </IdoLayout>
  )
}

export default CurrentIdo
