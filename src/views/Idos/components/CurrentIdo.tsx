import React from 'react'
import { Text } from 'common-uikitstrungdao'
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

interface CurrentIdoProps {
  openPools: OpenPools
  isLoadingState: boolean
}

const CurrentIdo: React.FC<CurrentIdoProps> = ({ openPools: { openingPools, upcomingPools }, isLoadingState }) => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
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
      <Text fontSize="20px" textAlign="center">
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
    </IdoLayout>
  )
}

export default CurrentIdo
