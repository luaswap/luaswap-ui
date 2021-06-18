import React from 'react'
import { Text } from 'common-uikitstrungdao'
import styled from 'styled-components'
import PoolDetail from './PoolDetail'
import IdoLayout from './IdoLayout'

const Row = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const CurrentIdo = () => {
  return (
    <IdoLayout>
      <Text fontSize="20px" textAlign="center">
        Opening Pools
      </Text>
      <Row>
        <PoolDetail status="Opening"/>
      </Row>
      <Text fontSize="20px" textAlign="center">
        Upcoming Pools
      </Text>
      <Row>
        <PoolDetail status="Opening" />
      </Row>
    </IdoLayout>
  )
}

export default CurrentIdo
