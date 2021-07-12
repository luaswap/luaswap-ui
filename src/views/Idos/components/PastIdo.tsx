import React from 'react'
import styled from 'styled-components'
import { Text } from 'common-uikitstrungdao'
import { Pool } from '../types'
import IdoLayout from './IdoLayout'
import PoolDetail from './PoolDetail'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

interface PastIdoPools {
  closedPools: Pool[]
  isLoadingState: boolean
}

const PastIdo: React.FC<PastIdoPools> = ({ closedPools, isLoadingState }) => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
        Closed Pools
      </Text>
      <Row>
        {closedPools.map((pool) => {
          return <PoolDetail pool={pool} />
        })}
      </Row>
    </IdoLayout>
  )
}

export default PastIdo
