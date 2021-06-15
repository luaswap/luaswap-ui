import React from 'react'
import { Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'

const Row = styled.div`
  min-width: 600px;
  margin: 0 auto;
`

const CurrentIdo = () => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
        Opening Pools
      </Text>
      <Row>
        <PoolDetail />
      </Row>
      <Text fontSize="20px" textAlign="center">
        Upcoming Pools
      </Text>
      <Row>
        <PoolDetail />
      </Row>
    </IdoLayout>
  )
}

export default CurrentIdo
