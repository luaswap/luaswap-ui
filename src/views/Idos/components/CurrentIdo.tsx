import React from 'react'
import { Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import { OpenPools } from 'state/types'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'
import { Pool } from '../types'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

interface CurrentIdoProps {
  openPools: OpenPools
}

const CurrentIdo: React.FC<CurrentIdoProps> = ({ openPools: { openingPools, upcomingPools } }) => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
        Opening Pools
      </Text>
      <Row>
        {openingPools.map((pool) => {
          return <PoolDetail pool={pool} />
        })}
      </Row>
      <Text fontSize="20px" textAlign="center">
        Upcoming Pools
      </Text>
      <Row>
        {upcomingPools.map((pool) => {
          return <PoolDetail pool={pool} />
        })}
      </Row>
    </IdoLayout>
  )
}

export default CurrentIdo
